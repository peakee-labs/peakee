import type { Ref } from 'react';
import { forwardRef, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { View } from 'react-native';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

type Props = {
	front: string;
	back: string;
	theme?: 'blue' | 'yellow' | 'red';
	containerStyle?: StyleProp<ViewStyle>;
	onOk?: () => void;
	onNotOk?: () => void;
	onChange?: (ratio: number) => void;
};

const xThreshold = 100;
const yThreshold = 100;

const _Flashcard = (
	{ front, back, theme = 'blue', onChange, onOk, onNotOk }: Props,
	ref: Ref<View>,
) => {
	const xOffset = useSharedValue(0);
	const yOffset = useSharedValue(0);
	const yRotate = useSharedValue(0);
	const [isFront, setIsFront] = useState(true);

	const pan = Gesture.Pan()
		.onChange((e) => {
			let totalTranslation = 0;
			if (Math.abs(e.translationX) <= xThreshold) {
				totalTranslation += Math.abs(e.translationX);
				if (isFront) {
					xOffset.value = e.translationX;
				} else {
					xOffset.value = e.translationX;
				}
			} else {
				totalTranslation += Math.abs(xThreshold);
			}

			if (Math.abs(e.translationY) <= yThreshold) {
				totalTranslation += Math.abs(e.translationY);
				if (isFront) {
					yOffset.value = e.translationY;
				} else {
					yOffset.value = e.translationY;
				}
			} else {
				totalTranslation += Math.abs(yThreshold);
			}

			if (onChange) {
				runOnJS(onChange)(totalTranslation / (xThreshold + yThreshold));
			}
		})
		.onFinalize(() => {
			console.log(xOffset.value);
			if (xOffset.value >= yThreshold * 0.9) {
				if (onOk) runOnJS(onOk)();
			} else if (xOffset.value <= -yThreshold * 0.9) {
				if (onNotOk) runOnJS(onNotOk)();
			}
			xOffset.value = withSpring(0);
			yOffset.value = withSpring(0);

			if (onChange) {
				runOnJS(onChange)(1);
			}
		});

	const animatedViewStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ rotateY: yRotate.value + 'deg' },
				{ translateX: xOffset.value },
				{ translateY: yOffset.value },
			],
		};
	});

	const animatedTextStyle = useAnimatedStyle(() => {
		if (yRotate.value >= 90) runOnJS(setIsFront)(false);
		else runOnJS(setIsFront)(true);
		return {
			transform: [{ rotateY: yRotate.value + 'deg' }],
		};
	});

	const flip = () => {
		if (yRotate.value >= 180) {
			yRotate.value = withTiming(0, { duration: 600 });
		} else {
			yRotate.value = withTiming(180, { duration: 600 });
		}
	};

	return (
		<GestureDetector gesture={pan}>
			<TouchableWithoutFeedback style={styles.card} onPress={flip}>
				<Animated.View
					ref={ref}
					style={[
						{ backgroundColor: colorMap[theme].background },
						styles.card,
						animatedViewStyle,
					]}
				>
					<Animated.Text
						style={[
							{ color: colorMap[theme].title },
							styles.title,
							animatedTextStyle,
							!isFront && styles.back,
						]}
					>
						{isFront ? front : back}
					</Animated.Text>
				</Animated.View>
			</TouchableWithoutFeedback>
		</GestureDetector>
	);
};

export const Flashcard = forwardRef<View, Props>(_Flashcard);

export default Flashcard;

const styles = StyleSheet.create({
	card: {
		flex: 1,
		borderRadius: 30,
		maxHeight: 500,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 36,
		fontWeight: '600',
		textAlign: 'center',
	},
	back: {
		transform: [
			{
				rotateY: '180deg',
			},
		],
	},
});

export const colorMap = {
	blue: {
		background: '#95FFFF',
		title: '#004040',
	},
	yellow: {
		background: '#FFE6A1',
		title: '#815F00',
	},
	red: {
		background: '#FFC8CE',
		title: '#69000B',
	},
};

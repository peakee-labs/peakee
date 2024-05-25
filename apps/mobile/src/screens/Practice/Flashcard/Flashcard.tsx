import { type FC, useState } from 'react';
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
};

export const Flashcard: FC<Props> = ({ front, back }) => {
	const xOffset = useSharedValue(0);
	const yOffset = useSharedValue(0);
	const yRotate = useSharedValue(0);
	const [isFront, setIsFront] = useState(true);

	const pan = Gesture.Pan()
		.onChange((e) => {
			xOffset.value = e.translationX;
			yOffset.value = e.translationY;
		})
		.onFinalize(() => {
			xOffset.value = withSpring(0);
			yOffset.value = withSpring(0);
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
			<TouchableWithoutFeedback style={styles.container} onPress={flip}>
				<Animated.View style={[styles.container, animatedViewStyle]}>
					<Animated.Text
						style={[
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

export default Flashcard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#95FFFF',
		borderRadius: 30,
		maxHeight: 500,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 36,
		fontWeight: '600',
		textAlign: 'center',
		color: '#004040',
	},
	back: {
		transform: [
			{
				rotateY: '180deg',
			},
		],
	},
});

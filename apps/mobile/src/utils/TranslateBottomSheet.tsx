import { type FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	AvoidSoftInput,
	useSoftInputHeightChanged,
} from 'react-native-avoid-softinput';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import type { Props } from '@peakee/app/features/TranslateBox';
import TranslateBox from '@peakee/app/features/TranslateBox';

type WrappedProps = Props & {
	onClose?: () => void;
};

export const TranslateBottomSheet: FC<WrappedProps> = ({ ...props }) => {
	const xOffset = useSharedValue<number>(0);
	const yOffset = useSharedValue<number>(0);

	const pan = Gesture.Pan()
		.onChange((event) => {
			yOffset.value += event.changeY;
			xOffset.value = event.translationX;
		})
		.onFinalize(() => {
			xOffset.value = 0;
		});

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: yOffset.value },
				{ translateX: xOffset.value },
			],
		};
	});

	useEffect(() => {
		AvoidSoftInput.setShouldMimicIOSBehavior(true);
		return () => {
			AvoidSoftInput.setShouldMimicIOSBehavior(false);
		};
	}, []);

	useSoftInputHeightChanged(({ softInputHeight }) => {
		console.log(yOffset.value, softInputHeight);
		if (Math.abs(yOffset.value) < softInputHeight) {
			yOffset.value = -softInputHeight;
		}
	});

	return (
		<GestureDetector gesture={pan}>
			<Animated.View style={[styles.container, animatedStyles]}>
				<View style={styles.indicator} />
				<TranslateBox
					{...props}
					style={styles.translateContainer}
					contentFontSize={20}
				/>
			</Animated.View>
		</GestureDetector>
	);
};

export default TranslateBottomSheet;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingVertical: 14,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#e7e7e7',
	},
	indicator: {
		width: 30,
		height: 4,
		borderRadius: 10,
		backgroundColor: '#ccc',
		alignSelf: 'center',
		marginBottom: 24,
	},
	translateContainer: {},
});

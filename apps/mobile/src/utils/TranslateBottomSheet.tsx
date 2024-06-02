import type { Ref } from 'react';
import { forwardRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	AvoidSoftInput,
	useSoftInputHeightChanged,
} from 'react-native-avoid-softinput';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	SlideInDown,
	SlideOutDown,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import type { Props } from '@peakee/app/features/TranslateBox';
import TranslateBox from '@peakee/app/features/TranslateBox';

export type WrappedProps = Props & {
	onClose?: () => void;
};

export const _TranslateBottomSheet = (
	{ ...props }: WrappedProps,
	ref: Ref<View>,
) => {
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
			top: yOffset.value,
			left: xOffset.value,
			// transform: [
			// 	{ translateY: yOffset.value },
			// 	{ translateX: xOffset.value },
			// ],
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
			<Animated.View
				ref={ref}
				style={[styles.container, animatedStyles]}
				entering={SlideInDown}
				exiting={SlideOutDown}
			>
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

export const TranslateBottomSheet = forwardRef<View, WrappedProps>(
	_TranslateBottomSheet,
);

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

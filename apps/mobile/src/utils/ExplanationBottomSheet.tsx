import type { Ref } from 'react';
import { forwardRef, useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import {
	AvoidSoftInput,
	useSoftInputHeightChanged,
} from 'react-native-avoid-softinput';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	SlideInDown,
	SlideOutDown,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import type { Props } from '@peakee/app/features/ExplanationBox';
import ExplanationBox from '@peakee/app/features/ExplanationBox';

export type WrappedProps = Props & {
	style?: StyleProp<ViewStyle>;
	onClose?: () => void;
};

export const _ExplanationBottomSheet = (
	{
		// this style prop is from ModalContainer (empty-modal), includes layout measurement of float modal
		style,
		onClose,
		...props
	}: WrappedProps,
	ref: Ref<View>,
) => {
	const yOffset = useSharedValue<number>(0);

	const pan = Gesture.Pan()
		.onChange((event) => {
			if (yOffset.value + event.changeY > 0)
				yOffset.value += event.changeY;
		})
		.onFinalize(() => {
			if (yOffset.value > 200 && onClose) runOnJS(onClose)();
			else {
				yOffset.value = withTiming(0);
			}
		});

	const animatedStyles = useAnimatedStyle(() => {
		return {
			// top: yOffset.value,
			// left: xOffset.value,
			transform: [{ translateY: yOffset.value }],
		};
	});

	useEffect(() => {
		AvoidSoftInput.setShouldMimicIOSBehavior(true);
		return () => {
			AvoidSoftInput.setShouldMimicIOSBehavior(false);
		};
	}, []);

	useSoftInputHeightChanged(({ softInputHeight }) => {
		if (Math.abs(yOffset.value) < softInputHeight) {
			yOffset.value = -softInputHeight;
		}
	});

	return (
		<GestureDetector gesture={pan}>
			<Animated.View
				ref={ref}
				style={[style, styles.container, animatedStyles]}
				entering={SlideInDown}
				exiting={SlideOutDown}
			>
				<View style={styles.indicator} />
				<ExplanationBox
					{...props}
					style={[styles.explanationContainer]}
					contentSize={17}
					titleSize={14}
					mainContentSize={18}
				/>
			</Animated.View>
		</GestureDetector>
	);
};

export const ExplanationBottomSheet = forwardRef<View, WrappedProps>(
	_ExplanationBottomSheet,
);

export default ExplanationBottomSheet;

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
		marginBottom: 12,
	},
	explanationContainer: {
		paddingHorizontal: 16,
		paddingBottom: 50,
		borderRadius: 20,
	},
});

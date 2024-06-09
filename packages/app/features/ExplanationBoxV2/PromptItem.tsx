import { type FC, useEffect, useRef, useState } from 'react';
import type { LayoutRectangle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { HorizontalDrag } from '@peakee/icons';
import { Hoverable } from '@peakee/ui';

import type { ExplanationPrompt } from '../../api';

import type { SharedProps, WrappedDragLayoutRectangle } from './shared';
import { sharedStyles } from './shared';

type PromptItemProps = SharedProps & {
	index: number;
	prompt: ExplanationPrompt;
	onDrag?: (layout: WrappedDragLayoutRectangle) => void;
	onDrop?: (layout: WrappedDragLayoutRectangle) => void;
};

export const PromptItem: FC<PromptItemProps> = ({
	index,
	prompt,
	itemContainerStyle,
	titleTextStyle,
	mainTextStyle,
	extendTextStyle,
	onDrag,
	onDrop,
}) => {
	const ref = useRef<View>(null);
	const layout = useRef<LayoutRectangle>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
	const [pressed, setPressed] = useState(false);
	const yOffset = useSharedValue(0);
	const xOffset = useSharedValue(0);
	const { title, main, extend } = prompt;

	const pan = Gesture.Pan()
		.onBegin(() => {
			runOnJS(setPressed)(true);
		})
		.onChange((event) => {
			if (onDrag) {
				runOnJS(onDrag)({
					index,
					...layout.current,
					y: layout.current.y + yOffset.value,
				});
			}
			yOffset.value += event.changeY;
			if (
				Math.abs(xOffset.value) < 50 ||
				(xOffset.value > 50 && event.changeX < 0) ||
				(xOffset.value < 50 && event.changeX > 0)
			) {
				xOffset.value += event.changeX;
			}
		})
		.onFinalize(() => {
			if (onDrop) {
				runOnJS(onDrop)({ index, ...layout.current });
			}
			yOffset.value = withSpring(0, {
				duration: 800,
				clamp: { max: 8 },
			});
			xOffset.value = withSpring(0, {
				duration: 800,
				clamp: { max: 8 },
			});
			runOnJS(setPressed)(false);
		});

	const dragStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: yOffset.value },
				{ translateX: xOffset.value },
			],
		};
	});

	useEffect(() => {
		setTimeout(() => {
			ref.current?.measure((x, y, width, height) => {
				layout.current = { x, y, width, height };
			});
		}, 0);
	}, [index]);

	return (
		<Animated.View
			ref={ref}
			style={[styles.container, dragStyle, pressed && styles.dragStyle]}
		>
			<GestureDetector gesture={pan}>
				<Hoverable style={styles.dragButton}>
					<HorizontalDrag
						size={16}
						color={'#979797'}
						strokeWidth="3"
					/>
				</Hoverable>
			</GestureDetector>
			<View
				style={[
					sharedStyles.itemContainer,
					styles.itemContainer,
					itemContainerStyle,
				]}
			>
				<View style={styles.fieldContainer}>
					<View style={styles.fieldTitleContainer}>
						<Text style={styles.fieldTitle}>{'Title'}</Text>
					</View>
					<Text style={[sharedStyles.titleTextStyle, titleTextStyle]}>
						{title}
					</Text>
				</View>
				<View style={styles.fieldContainer}>
					<View style={styles.fieldTitleContainer}>
						<Text style={styles.fieldTitle}>{'Main'}</Text>
					</View>
					<Text style={[sharedStyles.mainTextStyle, mainTextStyle]}>
						{main}
					</Text>
				</View>
				<View style={styles.fieldContainer}>
					<View style={styles.fieldTitleContainer}>
						<Text style={styles.fieldTitle}>{'Extend'}</Text>
					</View>
					<Text
						style={[sharedStyles.extendTextStyle, extendTextStyle]}
					>
						{extend}
					</Text>
				</View>
			</View>
		</Animated.View>
	);
};

export default PromptItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 6,
		borderWidth: 1.6,
		borderColor: 'transparent',
		borderRadius: 10,
	},
	dragButton: {
		position: 'absolute',
		left: 2,
		top: 10,
	},
	fieldContainer: {
		flexDirection: 'row',
	},
	itemContainer: {
		flex: 1,
		marginLeft: 12,
	},
	fieldTitleContainer: {
		width: 54,
	},
	fieldTitle: {
		fontWeight: '700',
		fontStyle: 'normal',
		opacity: 0.6,
		fontSize: 14,
	},
	dragStyle: {
		zIndex: 1,
		backgroundColor: '#fff',
		borderWidth: 1.6,
		borderColor: '#DADADA',
		borderRadius: 10,
		opacity: 0.5,
	},
});

import { type FC, useState } from 'react';
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

import type { SharedProps } from './shared';
import { sharedStyles } from './shared';

type PromptItemProps = SharedProps & {
	prompt: ExplanationPrompt;
	onDrag?: (yOffset: number) => void;
	onDrop?: (yOffset: number) => void;
};

export const PromptItem: FC<PromptItemProps> = ({
	prompt,
	itemContainerStyle,
	titleTextStyle,
	mainTextStyle,
	extendTextStyle,
	onDrag,
	onDrop,
}) => {
	const [pressed, setPressed] = useState(false);
	const yOffset = useSharedValue(0);
	const xOffset = useSharedValue(0);
	const { title, main, extend } = prompt;

	const pan = Gesture.Pan()
		.onBegin(() => {
			runOnJS(setPressed)(true);
		})
		.onChange((event) => {
			if (onDrag) runOnJS(onDrag)(yOffset.value);
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
			if (onDrop) runOnJS(onDrop)(yOffset.value);
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

	return (
		<Animated.View
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

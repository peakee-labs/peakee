import type { FC, Ref } from 'react';
import { forwardRef, Fragment, useState } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import type {
	Explanation,
	ExplanationPrompt,
	ExplanationPrompts,
	Explanations,
} from '@peakee/app/api';
import { HorizontalDrag, PencilLine } from '@peakee/icons';
import { Hoverable } from '@peakee/ui';

export type Props = {
	explanations: Explanations;
	prompt: ExplanationPrompts;
	style?: StyleProp<ViewStyle>;
	editContainerStyle?: StyleProp<ViewStyle>;
	itemContainerStyle?: StyleProp<ViewStyle>;
	titleTextStyle?: StyleProp<TextStyle>;
	mainTextStyle?: StyleProp<TextStyle>;
	extendTextStyle?: StyleProp<TextStyle>;
	onSavePrompt?: (prompt: ExplanationPrompts) => void;
};

export type Position = {
	left: number;
	top: number;
};

const _ExplanationBoxV2 = (
	{
		explanations,
		prompt,
		style,
		editContainerStyle,
		itemContainerStyle,
		titleTextStyle,
		mainTextStyle,
		extendTextStyle,
	}: Props,
	ref: Ref<View>,
) => {
	const [internalPrompt] = useState(prompt);
	const [editMode, setEditMode] = useState(false);

	const toggleEditMode = () => setEditMode((m) => !m);

	return (
		<View
			ref={ref}
			style={[styles.container, style, editMode && editContainerStyle]}
		>
			{!editMode
				? explanations.map((explanation) => {
						return (
							<ExplanationItem
								key={explanation.key}
								explanation={explanation}
								itemContainerStyle={itemContainerStyle}
								titleTextStyle={titleTextStyle}
								mainTextStyle={mainTextStyle}
								extendTextStyle={extendTextStyle}
							/>
						);
				  })
				: internalPrompt.map((prompt, index) => {
						return (
							<Fragment key={prompt.key}>
								<PromptItem
									prompt={prompt}
									itemContainerStyle={itemContainerStyle}
									titleTextStyle={titleTextStyle}
									mainTextStyle={mainTextStyle}
									extendTextStyle={extendTextStyle}
								/>
								{index !== internalPrompt.length - 1 && (
									<View style={styles.indicator} />
								)}
							</Fragment>
						);
				  })}
			<Hoverable style={styles.editButton} onPress={toggleEditMode}>
				<PencilLine size={16} color={'#979797'} strokeWidth="3" />
			</Hoverable>
		</View>
	);
};

type ExplanationItemProps = {
	explanation: Explanation;
	itemContainerStyle?: StyleProp<ViewStyle>;
	titleTextStyle?: StyleProp<TextStyle>;
	mainTextStyle?: StyleProp<TextStyle>;
	extendTextStyle?: StyleProp<TextStyle>;
};

const ExplanationItem: FC<ExplanationItemProps> = ({
	explanation,
	itemContainerStyle,
	titleTextStyle,
	mainTextStyle,
	extendTextStyle,
}) => {
	const { title, main, extend } = explanation;
	return (
		<View style={[styles.itemContainer, itemContainerStyle]}>
			<Text style={[styles.titleTextStyle, titleTextStyle]}>{title}</Text>
			<Text style={[styles.mainTextStyle, mainTextStyle]}>{main}</Text>
			{extend && (
				<Text style={[styles.extendTextStyle, extendTextStyle]}>
					{extend}
				</Text>
			)}
		</View>
	);
};

type PromptItemProps = {
	prompt: ExplanationPrompt;
	itemContainerStyle?: StyleProp<ViewStyle>;
	titleTextStyle?: StyleProp<TextStyle>;
	mainTextStyle?: StyleProp<TextStyle>;
	extendTextStyle?: StyleProp<TextStyle>;
};

const PromptItem: FC<PromptItemProps> = ({
	prompt,
	itemContainerStyle,
	titleTextStyle,
	mainTextStyle,
	extendTextStyle,
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
			style={[
				styles.promptContainer,
				dragStyle,
				pressed && styles.dragStyle,
			]}
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
					styles.itemContainer,
					styles.promptItemContentContainer,
					itemContainerStyle,
				]}
			>
				<View style={styles.promptItemContainer}>
					<View style={styles.promptFieldTitleContainer}>
						<Text style={styles.promptFieldTitle}>{'Title'}</Text>
					</View>
					<Text style={[styles.titleTextStyle, titleTextStyle]}>
						{title}
					</Text>
				</View>
				<View style={styles.promptItemContainer}>
					<View style={styles.promptFieldTitleContainer}>
						<Text style={styles.promptFieldTitle}>{'Main'}</Text>
					</View>
					<Text style={[styles.mainTextStyle, mainTextStyle]}>
						{main}
					</Text>
				</View>
				<View style={styles.promptItemContainer}>
					<View style={styles.promptFieldTitleContainer}>
						<Text style={styles.promptFieldTitle}>{'Extend'}</Text>
					</View>
					<Text style={[styles.extendTextStyle, extendTextStyle]}>
						{extend}
					</Text>
				</View>
			</View>
		</Animated.View>
	);
};

export const ExplanationBoxV2 = forwardRef<View, Props>(_ExplanationBoxV2);

export default ExplanationBoxV2;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1.6,
		borderColor: '#DADADA',
		borderRadius: 20,
		padding: 10,
		gap: 10,
	},
	itemContainer: {
		gap: 3,
		padding: 10,
	},
	titleTextStyle: {
		fontSize: 14,
		fontWeight: '700',
		marginBottom: 3,
	},
	mainTextStyle: {
		fontSize: 16,
	},
	extendTextStyle: {
		fontSize: 16,
		fontWeight: '300',
		fontStyle: 'italic',
	},
	editButton: {
		position: 'absolute',
		right: 20,
	},
	promptContainer: {
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
	promptItemContainer: {
		flexDirection: 'row',
	},
	promptItemContentContainer: {
		flex: 1,
		marginLeft: 12,
	},
	promptFieldTitleContainer: {
		width: 54,
	},
	promptFieldTitle: {
		fontWeight: '700',
		fontStyle: 'normal',
		opacity: 0.6,
		fontSize: 14,
	},
	indicator: {
		height: 2,
		borderRadius: 20,
		backgroundColor: '#DADADA',
		marginHorizontal: 14,
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

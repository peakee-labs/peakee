import type { FC, Ref } from 'react';
import { forwardRef, Fragment, useState } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
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
	const { title, main, extend } = prompt;
	return (
		<View style={styles.promptContainer}>
			<Hoverable style={styles.dragButton}>
				<HorizontalDrag size={16} color={'#979797'} strokeWidth="3" />
			</Hoverable>
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
		</View>
	);
};

export const ExplanationBoxV2 = forwardRef<View, Props>(_ExplanationBoxV2);

export default ExplanationBoxV2;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1.6,
		borderColor: '#DADADA',
		borderRadius: 20,
		padding: 20,
		gap: 20,
	},
	itemContainer: {
		gap: 3,
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
	},
	dragButton: {
		position: 'absolute',
		left: -8,
		top: 0,
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
});

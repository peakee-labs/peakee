import type { Ref } from 'react';
import { forwardRef, Fragment, useCallback, useState } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { ExplanationPrompts, Explanations } from '@peakee/app/api';
import { PencilLine } from '@peakee/icons';
import { Hoverable } from '@peakee/ui';

import { ExplanationItem } from './ExplanationItem';
import Indicator from './Indicator';
import PromptItem from './PromptItem';
import type { SharedProps } from './shared';

export type Props = SharedProps & {
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

	const handleDrag = useCallback((index: number) => {
		return (offset: number) => {
			console.log(index, offset);
		};
	}, []);

	const handleDrop = useCallback((index: number) => {
		return (offset: number) => {
			console.log(index, offset);
		};
	}, []);

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
								<Indicator index={index} />
								<PromptItem
									prompt={prompt}
									itemContainerStyle={itemContainerStyle}
									titleTextStyle={titleTextStyle}
									mainTextStyle={mainTextStyle}
									extendTextStyle={extendTextStyle}
									onDrag={handleDrag(index)}
									onDrop={handleDrop(index)}
								/>
								{index === internalPrompt.length - 1 && (
									<Indicator index={internalPrompt.length} />
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
	editButton: {
		position: 'absolute',
		right: 10,
		top: 8,
	},
});

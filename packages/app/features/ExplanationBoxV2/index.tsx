import type { Ref } from 'react';
import { forwardRef, Fragment, useCallback, useRef, useState } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { ExplanationPrompts, Explanations } from '@peakee/app/api';
import { PencilLine } from '@peakee/icons';
import { Hoverable } from '@peakee/ui';

import { ExplanationItem } from './ExplanationItem';
import Indicator from './Indicator';
import PromptItem from './PromptItem';
import type { SharedProps, WrappedDragLayoutRectangle } from './shared';

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
	const [dragLayout, setDragLayout] = useState<WrappedDragLayoutRectangle>();
	const [internalPrompt, setInternalPrompt] = useState(prompt);
	const [editMode, setEditMode] = useState(false);
	const currentHighlightIndicator = useRef<number>();

	const toggleEditMode = () => setEditMode((m) => !m);

	const handleDrag = useCallback((layout: WrappedDragLayoutRectangle) => {
		setDragLayout(layout);
	}, []);

	const handleDrop = useCallback(
		(layout: WrappedDragLayoutRectangle) => {
			setDragLayout(layout);
			const currentIndex = layout.index;
			const newIndex = currentHighlightIndicator.current;
			if (newIndex === undefined || newIndex === currentIndex) return;
			const moveUp = newIndex < currentIndex;
			const moveDown =
				newIndex > currentIndex && newIndex !== currentIndex + 1;
			if (moveUp || moveDown) {
				movePromptItem(currentIndex, newIndex);
			}
		},
		[internalPrompt],
	);

	const movePromptItem = (currentIndex: number, newIndex: number) => {
		const newPrompt = [...internalPrompt];
		const [item] = newPrompt.splice(currentIndex, 1);
		if (newIndex > internalPrompt.length - 1) {
			// move to tail
			newPrompt.push(item);
			setInternalPrompt(newPrompt);
		} else if (newIndex === 0) {
			// move to head
			newPrompt.unshift(item);
			setInternalPrompt(newPrompt);
		} else {
			// insert into slice index
			const sliceIndex =
				newIndex > currentIndex ? newIndex - 1 : newIndex;
			setInternalPrompt([
				...newPrompt.slice(0, sliceIndex),
				item,
				...newPrompt.slice(sliceIndex),
			]);
		}
	};

	const handleIndicatorOnHighlight = useCallback((index: number) => {
		currentHighlightIndicator.current = index;
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
							<Fragment key={`${prompt.key}-${index}`}>
								<Indicator
									index={index}
									dragLayout={dragLayout}
									onHighlight={handleIndicatorOnHighlight}
								/>
								<PromptItem
									index={index}
									prompt={prompt}
									itemContainerStyle={itemContainerStyle}
									titleTextStyle={titleTextStyle}
									mainTextStyle={mainTextStyle}
									extendTextStyle={extendTextStyle}
									onDrag={handleDrag}
									onDrop={handleDrop}
								/>
								{index === internalPrompt.length - 1 && (
									<Indicator
										index={internalPrompt.length}
										dragLayout={dragLayout}
										onHighlight={handleIndicatorOnHighlight}
									/>
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

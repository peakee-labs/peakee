import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getSuggestTextInSentence } from '@peakee/app/api';

import Highlight from './HighLight';
import SimpleSuggestBox from './SimpleSuggestBox';
import SuggestIcon from './SuggestIcon';
import SuggestLoading from './SuggestLoading';
import type {
	Position,
	SimpleSuggestContext,
	Suggestion,
	WrappedDOMRect,
} from './types';
import { retrieveSelection } from './utils';

export const ContentApp = () => {
	const context = useRef<SimpleSuggestContext>();
	const resetLastSelection = useRef<() => void>();
	const [iconPosition, setIconPosition] = useState<Position>();
	const [suggestBoxPosition, setSuggestBoxPosition] = useState<Position>();
	const [loading, setLoading] = useState(false);
	const [highlight, setHighlight] = useState<boolean>(false);
	const [suggestion, setSuggestion] = useState<Suggestion>();
	const [rects, setRects] = useState<WrappedDOMRect[]>([]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const listener = function (e: MouseEvent) {
			const selection = window.getSelection();
			const isEmpty =
				!selection || !selection.toString() || selection.rangeCount < 1;
			if (isEmpty) {
				context.current = undefined;
				resetLastSelection?.current?.();
				setSuggestion(undefined);
				setIconPosition(undefined);
				setHighlight(false);
				setRects([]);
			} else {
				const isResetSelection =
					selection.toString() === context?.current?.text;
				if (!isResetSelection) {
					handleSelect(selection);
				}
			}
		};
		document.addEventListener('mouseup', listener);
		return () => document.removeEventListener('mouseup', listener);
	}, []);

	const handleSelect = (selection: Selection) => {
		if (
			selection.rangeCount !== 1 ||
			selection.anchorNode !== selection.focusNode
		) {
			console.log('just support single selection');
			return;
		}

		const range = selection.getRangeAt(0);
		const element = range.commonAncestorContainer.parentElement;
		const rects = range.getClientRects();
		const isValidSelection =
			element &&
			rects.length > 0 &&
			selection.toString().trim().length > 0;
		if (isValidSelection) {
			const { selectedText, currentSentence, allRects, resetInspecting } =
				retrieveSelection(selection);
			const newContext = {
				text: selectedText,
				sentence: currentSentence,
			};
			setRects(allRects);
			context.current = newContext;
			resetLastSelection.current = resetInspecting;
			setIconPosition({
				left: rects[0].x + rects[0].width - 4,
				top: rects[0].y - rects[0].height,
			});
			setSuggestBoxPosition({
				top:
					allRects[allRects.length - 1].rect.top +
					allRects[allRects.length - 1].rect.height +
					10,
				left: rects[0].left,
			});
		}
	};

	const handlePressSuggestIcon = async () => {
		if (!context.current) return;
		window.getSelection()?.removeAllRanges();
		setHighlight(true);
		setLoading(true);

		const { text, sentence } = context.current;
		const suggestion = await getSuggestTextInSentence(text, sentence);
		if (suggestion) {
			setSuggestion(suggestion);
		}

		setLoading(false);
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<View style={[styles.absolute, iconPosition]}>
					<SuggestLoading />
				</View>
			) : (
				iconPosition && (
					<View style={[styles.absolute, iconPosition]}>
						<SuggestIcon onPress={handlePressSuggestIcon} />
					</View>
				)
			)}
			{highlight && rects && <Highlight rects={rects} />}
			{suggestion && suggestBoxPosition && (
				<SimpleSuggestBox
					position={suggestBoxPosition}
					suggestion={suggestion}
				/>
			)}
		</View>
	);
};

export default ContentApp;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
	absolute: {
		position: 'absolute',
	},
});

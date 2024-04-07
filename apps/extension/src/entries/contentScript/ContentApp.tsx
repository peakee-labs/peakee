import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getSuggestTextInSentence } from '@peakee/app/api';

import Highlight from './HighLight';
import SimpleSuggestBox from './SimpleSuggestBox';
import SuggestIcon from './SuggestIcon';
import SuggestLoading from './SuggestLoading';
import type { Position, Suggestion, WrappedDOMRect } from './types';
import { logger, retrieveSentenceOfWordsInSingleRange } from './utils';

export const ContentApp = () => {
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
				resetLastSelection?.current?.();
				resetLastSelection.current = undefined;
				setSuggestion(undefined);
				setIconPosition(undefined);
				setHighlight(false);
				setRects([]);
			} else {
				handleSelect(selection);
			}
		};
		document.addEventListener('mouseup', listener);
		return () => document.removeEventListener('mouseup', listener);
	}, []);

	const handleSelect = (selection: Selection) => {
		const range = selection.getRangeAt(0);
		const rects = range.getClientRects();
		setIconPosition({
			left: rects[0].x + rects[0].width - 4,
			top: rects[0].y - rects[0].height,
		});
	};

	const handlePressSuggestIcon = async () => {
		const selection = window.getSelection();
		if (!selection) {
			logger.log("can't get selection to show suggestion");
			return;
		}
		const result = retrieveSentenceOfWordsInSingleRange(selection);
		if (!result) return;
		const { text, wrappedRects, sentence, resetInspecting } = result;
		setRects(wrappedRects);
		resetLastSelection.current = resetInspecting;
		setSuggestBoxPosition({
			top:
				wrappedRects[wrappedRects.length - 1].rect.top +
				wrappedRects[wrappedRects.length - 1].rect.height +
				10,
			left: wrappedRects[0].rect.left,
		});
		setHighlight(true);
		setLoading(true);

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
		zIndex: 100000,
		position: 'absolute',
		top: 0,
		left: 0,
	},
	absolute: {
		position: 'absolute',
	},
});

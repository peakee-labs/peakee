import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getSuggestTextInSentence } from '@peakee/app/api';

import { type AskContext, AskBox } from './AskBox';
import Highlight from './HighLight';
import SimpleSuggestBox from './SimpleSuggestBox';
import SuggestIcon from './SuggestIcon';
import SuggestLoading from './SuggestLoading';
import type { Position, Suggestion, WrappedDOMRect } from './types';
import { logger, retrieveSentenceOfWordsInSingleRange } from './utils';

export const ContentApp = () => {
	const resetLastSelection = useRef<() => void>();
	const [loading, setLoading] = useState(false);

	const [iconPosition, setIconPosition] = useState<Position>();

	const [suggestion, setSuggestion] = useState<Suggestion>();
	const [suggestBoxPosition, setSuggestBoxPosition] = useState<Position>();
	const suggestBoxRef = useRef(null);

	const [highlight, setHighlight] = useState<boolean>(false);
	const [rects, setRects] = useState<WrappedDOMRect[]>([]);

	const [askContext, setAskContext] = useState<AskContext>();
	const [askBoxPosition, setAskBoxPosition] = useState<Position>();
	const askBoxRef = useRef(null);

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
				setAskContext(undefined);
				setAskBoxPosition(undefined);
			} else {
				handleSelect(selection);
			}
		};
		document.addEventListener('mouseup', listener);

		// need to wait for a while
		setTimeout(() => {
			const inputs = document.querySelectorAll('input');
			inputs.forEach((input) => {
				input.addEventListener('select', (e) => {
					const typedEvent =
						e as never as ChangeEvent<HTMLInputElement>;

					if (
						!typedEvent.target ||
						!typedEvent.target.selectionStart ||
						!typedEvent.target.selectionEnd
					)
						return;

					const context = typedEvent.target.value;
					const start = typedEvent.target.selectionStart;
					const end = typedEvent.target.selectionEnd;
					const selection = context.substring(start, end);

					setAskContext({ selection, context, start, end });

					const rect = typedEvent.target.getBoundingClientRect();
					setAskBoxPosition({
						top: window.scrollY + rect.top + rect.height,
						left: window.scrollX + rect.left,
					});
				});
			});
		}, 0);

		return () => document.removeEventListener('mouseup', listener);
	}, []);

	const handleSelect = (selection: Selection) => {
		const range = selection.getRangeAt(0);
		const rects = range.getClientRects();
		const rect = rects[0];

		// rect might be undefined if the selection is from input component
		if (!rect) return;

		setIconPosition({
			left: window.scrollX + rect.x + rect.width - 4,
			top: window.scrollY + rect.y - rect.height,
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
				window.scrollY +
				wrappedRects[wrappedRects.length - 1].rect.top +
				wrappedRects[wrappedRects.length - 1].rect.height +
				10,
			left: window.scrollX + wrappedRects[0].rect.left,
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
			{askContext && askBoxPosition && (
				<AskBox
					ref={askBoxRef}
					context={askContext}
					position={askBoxPosition}
				/>
			)}

			{suggestion && suggestBoxPosition && (
				<SimpleSuggestBox
					ref={suggestBoxRef}
					position={suggestBoxPosition}
					suggestion={suggestion}
				/>
			)}

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

import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TranslateBox from '@peakee/app/features/TranslateBox';

import { type AskContext, AskBox } from './AskBox';
import Highlight from './HighLight';
import {
	requestExplainViaMessage,
	requestTranslateViaMessaging,
} from './messaging';
import SimpleSuggestBox from './SimpleSuggestBox';
import SuggestLoading from './SuggestLoading';
import ToolBox from './ToolBox';
import ToolIcon from './ToolIcon';
import type { Position, Suggestion, WrappedDOMRect } from './types';
import {
	isInside,
	logger,
	measure,
	retrieveSentenceOfWordsInSingleRange,
} from './utils';

export const ContentApp = () => {
	const resetLastSelection = useRef<() => void>();
	const [loading, setLoading] = useState(false);

	const [iconPosition, setIconPosition] = useState<Position>();
	const [toolBox, setToolBox] = useState(false);

	const [translatePosition, setTranslatePosition] = useState<Position>();
	const [selectedText, setSelectedText] = useState('');
	const translateBoxRef = useRef(null);

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
		const handleMouseUp = async function (e: MouseEvent) {
			const selection = window.getSelection();

			if (!selection) {
				setToolBox(false);
				setIconPosition(undefined);
				return;
			}

			const noSelectionRange = selection.rangeCount < 1;
			const isEmptySelection = !selection.toString() || noSelectionRange;
			if (!isEmptySelection) {
				return handleSelect(selection);
			} else if (noSelectionRange) {
				logger.log('no selection');
				return;
			}

			const { top, left, width, height } = selection
				.getRangeAt(0)
				.getBoundingClientRect();

			const selectBox = {
				x: left + window.scrollX,
				y: top + window.scrollY,
				width,
				height,
			};

			if (
				askBoxRef.current &&
				(suggestBoxRef.current || suggestBoxRef.current)
			) {
				const askBox = await measure(askBoxRef.current);
				const isSelectInsideAskBox = isInside(selectBox, askBox);

				const suggestBox = await measure(suggestBoxRef.current);
				const isSelectInsideSuggestBox = isInside(
					selectBox,
					suggestBox,
				);

				const translateBox = await measure(translateBoxRef.current);
				const isSelectInsideTranslateBox = isInside(
					selectBox,
					translateBox,
				);

				if (isSelectInsideAskBox && !isSelectInsideSuggestBox) {
					resetSuggestBox();
				} else if (
					isSelectInsideAskBox &&
					!isSelectInsideTranslateBox
				) {
					resetTranslateBox();
				} else if (!isSelectInsideAskBox && !isSelectInsideSuggestBox) {
					resetSuggestBox();
					resetAskBox();
				} else if (
					!isSelectInsideAskBox &&
					!isSelectInsideTranslateBox
				) {
					resetTranslateBox();
					resetAskBox();
				}
			} else if (askBoxRef.current) {
				const box = await measure(askBoxRef.current);
				const isSelectInsideAskBox =
					isInside(selectBox, box) ||
					// when adding TextInput, the selection below input will create selectBox with empty x, y
					// it might be not a select, just a mouseup
					// temporarily fix with compare the focusNode, and use depth == 3
					askBoxRef.current === selection.focusNode ||
					askBoxRef.current === selection.focusNode?.parentNode ||
					askBoxRef.current ===
						selection.focusNode?.parentNode?.parentNode;
				if (!isSelectInsideAskBox) resetAskBox();
				// reset icon position if have a empty select inside ask box
				else {
					setIconPosition(undefined);
					setToolBox(false);
				}
			} else if (suggestBoxRef.current) {
				const box = await measure(suggestBoxRef.current);
				const isSelectInsideSuggestBox = isInside(selectBox, box);
				if (!isSelectInsideSuggestBox) resetSuggestBox();
			} else if (translateBoxRef.current) {
				const box = await measure(translateBoxRef.current);
				const isSelectInsideTranslateBox =
					isInside(selectBox, box) ||
					// when adding TextInput, the selection below input will create selectBox with empty x, y
					// it might be not a select, just a mouseup
					// temporarily fix with compare the focusNode, and use depth == 3
					translateBoxRef.current === selection.focusNode ||
					translateBoxRef.current ===
						selection.focusNode?.parentNode ||
					translateBoxRef.current ===
						selection.focusNode?.parentNode?.parentNode;
				if (!isSelectInsideTranslateBox) resetTranslateBox();
			} else {
				setToolBox(false);
				setIconPosition(undefined);
				return;
			}
		};
		document.addEventListener('mouseup', handleMouseUp);

		const handleOnSelectInput = (e: ChangeEvent<HTMLInputElement>) => {
			if (!e.target || !e.target.selectionStart || !e.target.selectionEnd)
				return;

			const context = e.target.value;
			const start = e.target.selectionStart;
			const end = e.target.selectionEnd;
			const selection = context.substring(start, end);

			setAskContext({ selection, context, start, end });

			const rect = e.target.getBoundingClientRect();
			setAskBoxPosition({
				top: window.scrollY + rect.top + rect.height,
				left: window.scrollX + rect.left,
			});
		};
		// need to wait for a while
		setTimeout(() => {
			const inputs = document.querySelectorAll('input');
			inputs.forEach((input) => {
				input.addEventListener('select', handleOnSelectInput as never);
			});
		}, 0);

		// need to remove listener for all inputs
		return () => document.removeEventListener('mouseup', handleMouseUp);
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

	const handlePressToolIcon = () => {
		setToolBox((prev) => !prev);
	};

	const showSuggest = async () => {
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

		const suggestion = await requestExplainViaMessage(text, sentence);
		if (suggestion) {
			setSuggestion(suggestion);
		}
		setLoading(false);
		setIconPosition(undefined);
		setToolBox(false);
	};

	const showTranslate = () => {
		const selection = window.getSelection();
		if (!selection) return;
		const text = selection.toString();
		setSelectedText(text.trim());
		const rect = selection.getRangeAt(0).getBoundingClientRect();
		setTranslatePosition({
			top: window.scrollY + rect.top + rect.height + 10,
			left: window.scrollX + rect.left,
		});
		setToolBox(false);
		setIconPosition(undefined);
	};

	const resetTranslateBox = () => {
		setTranslatePosition(undefined);
		setSelectedText('');
	};

	const resetSuggestBox = () => {
		resetLastSelection?.current?.();
		resetLastSelection.current = undefined;
		setSuggestion(undefined);
		setSuggestBoxPosition(undefined);
		setHighlight(false);
		setRects([]);
		setIconPosition(undefined);
		setToolBox(false);
	};

	const resetAskBox = () => {
		setAskContext(undefined);
		setAskBoxPosition(undefined);
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

			{translatePosition && (
				<TranslateBox
					ref={translateBoxRef}
					style={[translatePosition, styles.translateBox]}
					contentFontSize={18}
					initText={selectedText}
					translate={requestTranslateViaMessaging}
					experimentalDynamicSize
				/>
			)}

			{loading ? (
				<View style={[styles.absolute, iconPosition]}>
					<SuggestLoading />
				</View>
			) : (
				iconPosition && (
					<View style={[styles.absolute, iconPosition]}>
						{toolBox && (
							<ToolBox
								style={styles.toolBox}
								onPressTranslate={showTranslate}
								onPressExplain={showSuggest}
							/>
						)}
						<ToolIcon onPress={handlePressToolIcon} />
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
	toolBox: {
		position: 'absolute',
		bottom: 0,
	},
	translateBox: {
		minWidth: 300,
		maxWidth: 800,
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		paddingVertical: 18,
		borderWidth: 1,
		borderColor: '#B1B6C1',
		borderRadius: 10,
	},
});

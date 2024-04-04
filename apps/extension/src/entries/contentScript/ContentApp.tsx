import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Highlight from './HighLight';
import SuggestIcon from './SuggestIcon';
import SuggestLoading from './SuggestLoading';
import type { SimpleSuggestContext, WrappedDOMRect } from './utils';
import { retrieveSelection, showSuggestWithContext } from './utils';

type Position = {
	left: number;
	top: number;
};

export const ContentApp = () => {
	const context = useRef<SimpleSuggestContext>();
	const [iconPosition, setIconPosition] = useState<Position>();
	const [loading, setLoading] = useState(false);
	const [highlight, setHighlight] = useState<boolean>(false);
	const [rects, setRects] = useState<WrappedDOMRect[]>([]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const listener = function (e: MouseEvent) {
			const selection = window.getSelection();
			const isEmpty =
				!selection || !selection.toString() || selection.rangeCount < 1;
			if (isEmpty) {
				context.current = undefined;
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
			const { selectedText, currentSentence, allRects } =
				retrieveSelection(selection);
			const newContext = {
				text: selectedText,
				sentence: currentSentence,
			};
			setRects(allRects);
			context.current = newContext;
			setIconPosition({
				left: rects[0].x + rects[0].width - 10,
				top: rects[0].y - rects[0].height,
			});
		}
	};

	const handlePressSuggestIcon = () => {
		if (!context.current) return;
		window.getSelection()?.removeAllRanges();
		setHighlight(true);
		setLoading(true);
		showSuggestWithContext(context.current).then(() => {
			setLoading(false);
		});
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

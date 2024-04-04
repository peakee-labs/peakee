import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Highlight from './HighLight';
import SuggestIcon from './SuggestIcon';
import SuggestLoading from './SuggestLoading';
import type { SimpleContext } from './utils';
import {
	getSelectedText,
	retrieveSelectionContext,
	showSuggestWithContext,
} from './utils';

type Position = {
	left: number;
	top: number;
};

export const ContentApp = () => {
	const [context, setContext] = useState<SimpleContext>();
	const [iconPosition, setIconPosition] = useState<Position>();
	const [loading, setLoading] = useState(false);
	const [highlight, setHighlight] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const listener = function (e: MouseEvent) {
			const selection = getSelectedText();
			const isEmpty =
				!selection || !selection.toString() || selection.rangeCount < 1;
			if (isEmpty) {
				setContext(undefined);
				setHighlight(false);
			} else {
				handleSelect(selection);
			}
		};
		document.addEventListener('mouseup', listener);
		return () => document.removeEventListener('mouseup', listener);
	}, []);

	const handleSelect = (selection: Selection) => {
		if (selection.rangeCount !== 1) {
			console.log('just support single selection');
			return;
		}

		const range = selection.getRangeAt(0);
		const element = range.commonAncestorContainer.parentElement;
		const rects = range.getClientRects();
		if (element && rects.length > 0) {
			const { selectedText, currentSentence } = retrieveSelectionContext(
				selection.toString(),
				element,
			);
			const rectItems: DOMRect[] = [];
			for (let i = 0; i < rects.length; i++) {
				rectItems.push(rects[i]);
			}
			const newContext = {
				text: selectedText,
				sentence: currentSentence,
				rects: rectItems,
				element,
			};
			setContext(newContext);
		}
	};

	const handlePressSuggestIcon = () => {
		if (!context) return;
		window.getSelection()?.removeAllRanges();
		setLoading(true);
		setHighlight(true);
		showSuggestWithContext(context).then(() => {
			setLoading(false);
		});
	};

	useEffect(() => {
		if (!context) {
			setIconPosition(undefined);
		} else {
			setIconPosition({
				left: context.rects[0].x + context.rects[0].width - 10,
				top: context.rects[0].y - context.rects[0].height,
			});
		}
	}, [context]);

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
			{highlight && context && <Highlight rects={context.rects} />}
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

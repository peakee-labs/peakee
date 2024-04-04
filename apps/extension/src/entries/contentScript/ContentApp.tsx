import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import SuggestIcon from './SuggestIcon';
import type { SimpleContext } from './utils';
import {
	getSelectedText,
	retrieveSelectionContext,
	showSuggestWithContext,
} from './utils';

export const ContentApp = () => {
	const [context, setContext] = useState<SimpleContext>();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const listener = function (e: MouseEvent) {
			const selection = getSelectedText();
			const isEmpty =
				!selection || !selection.toString() || selection.rangeCount < 1;
			if (isEmpty) {
				setContext(undefined);
			} else {
				handleSelect(selection);
			}
		};
		document.addEventListener('mouseup', listener);
		return () => document.removeEventListener('mouseup', listener);
	}, []);

	const handleSelect = (selection: Selection) => {
		const range = selection.getRangeAt(0);
		const element = range.commonAncestorContainer.parentElement;
		const rects = range.getClientRects();
		if (element && rects.length > 0) {
			const { selectedText, currentSentence } = retrieveSelectionContext(
				selection.toString(),
				element,
			);
			const newContext = {
				text: selectedText,
				sentence: currentSentence,
				rect: rects[0],
			};
			setContext(newContext);
		}
	};

	const handlePressSuggestIcon = () => {
		if (!context) return;
		showSuggestWithContext(context);
	};

	return (
		<View style={styles.container}>
			{context && (
				<SuggestIcon
					onPress={handlePressSuggestIcon}
					left={context.rect.x + context.rect.width - 10}
					top={context.rect.y - context.rect.height}
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
});

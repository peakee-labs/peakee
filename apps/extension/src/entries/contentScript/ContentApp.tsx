import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import SuggestIcon from './SuggestIcon';
import type { SimpleContext } from './utils';
import { getSelectedText, logger, retrieveSelectionContext } from './utils';

export const ContentApp = () => {
	const [currentContext, setCurrentContext] = useState<SimpleContext>();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const listener = function (e: MouseEvent) {
			const selection = getSelectedText();

			const isEmpty =
				!selection?.toString() ||
				!selection ||
				selection.rangeCount < 1;
			if (isEmpty) {
				setCurrentContext(undefined);
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
			const selectionContext = retrieveSelectionContext(
				selection.toString(),
				element,
			);

			const context = {
				text: selectionContext.selectedText,
				sentence: selectionContext.currentSentence,
				rect: rects[0],
			};

			console.log(context);
			setCurrentContext(context);
		}

		logger.log(selection);
	};

	return (
		<View style={styles.container}>
			{currentContext && (
				<SuggestIcon
					left={
						currentContext.rect.x + currentContext.rect.width - 10
					}
					top={currentContext.rect.y - currentContext.rect.height}
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

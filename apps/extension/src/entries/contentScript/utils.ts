import { createLogger } from '@peakee/logger';

export const logger = createLogger('ContentScript');

export type SimpleSuggestContext = {
	text: string;
	sentence: string;
};

export const showSuggestWithContext = async (context: SimpleSuggestContext) => {
	logger.log('show suggest');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { text, sentence } = context;
	// const suggestion = await getSuggestTextInSentence(text, sentence);
	// console.log(suggestion, '<-- suggestion');
};

export type WrappedDOMRect = {
	rect: DOMRect;
	type: 'left' | 'right' | 'main';
};

export const retrieveSelection = (selection: Selection) => {
	const text = selection.toString();
	const element =
		selection.getRangeAt(0).commonAncestorContainer.parentElement;
	if (!element)
		throw Error(
			"can't find element of the selection, need to validate selection",
		);

	const { innerText } = element;

	const start = Math.min(selection.anchorOffset, selection.focusOffset);
	const end = Math.max(selection.anchorOffset, selection.focusOffset);
	let startSentence = start;
	let endSentence = end;
	while (startSentence > 0 && innerText[startSentence - 1] !== '.')
		startSentence -= 1;
	while (endSentence < innerText.length && innerText[endSentence + 1] !== '.')
		endSentence += 1;

	const selectedElement = document.createElement('span');
	selectedElement.innerText = text;
	const leftWrapper = document.createElement('span');
	leftWrapper.innerText = innerText.slice(startSentence, start);
	const rightWrapper = document.createElement('span');
	rightWrapper.innerText = innerText.slice(end, endSentence + 1);

	element.replaceChildren(
		innerText.slice(0, startSentence),
		leftWrapper,
		selectedElement,
		rightWrapper,
		innerText.slice(endSentence + 1),
	);

	// reselect element after inspecting children
	selection?.selectAllChildren(selectedElement);

	const allRects: WrappedDOMRect[] = [];
	const selectedRects = selectedElement.getClientRects();
	for (let i = 0; i < selectedRects.length; i++) {
		allRects.push({ rect: selectedRects[i], type: 'main' });
	}

	const leftRects = leftWrapper.getClientRects();
	for (let i = 0; i < leftRects.length; i++) {
		allRects.push({ rect: leftRects[i], type: 'left' });
	}

	const rightRects = rightWrapper.getClientRects();
	for (let i = 0; i < rightRects.length; i++) {
		allRects.push({ rect: rightRects[i], type: 'right' });
	}

	const selectedSentence = innerText.slice(startSentence, endSentence + 1);
	return {
		selectedText: text.trim(),
		currentSentence: selectedSentence.trim(),
		allRects,
		resetInspecting: () => {
			element.replaceChildren(innerText);
		},
	};
};

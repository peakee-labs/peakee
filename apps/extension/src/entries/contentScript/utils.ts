import { createLogger } from '@peakee/logger';

import type { WrappedDOMRect } from './types';

export const logger = createLogger('ContentScript');

export const retrieveSentenceOfWordsInSingleRange = (selection: Selection) => {
	const selectedNode = selection.focusNode as Node;
	if (!isValidTextNode(selectedNode) || !isSingeSelection(selection)) {
		logger.log('not valid selection or not text node');
		return;
	}

	const innerText = selectedNode?.nodeValue as string;
	const start = Math.min(selection.anchorOffset, selection.focusOffset);
	const end = Math.max(selection.anchorOffset, selection.focusOffset);

	let startSentence = start;
	let endSentence = end;
	while (startSentence > 0 && innerText[startSentence - 1] !== '.')
		startSentence -= 1;
	while (endSentence < innerText.length && innerText[endSentence + 1] !== '.')
		endSentence += 1;

	const selectedElement = document.createElement('span');
	const text = selection.toString();
	selectedElement.innerText = text;

	// left part of the sentence
	const leftElement = document.createElement('span');
	leftElement.innerText = innerText.slice(startSentence, start) || '';

	// right part of the sentence
	const rightElement = document.createElement('span');
	rightElement.innerText = innerText.slice(end, endSentence + 1) || '';

	const newWrappedElement = document.createElement('span');
	newWrappedElement.append(
		innerText.slice(0, startSentence),
		leftElement,
		selectedElement,
		rightElement,
		innerText.slice(endSentence + 1),
	);

	// replace text node with new wrapped element
	const parentElement = selectedNode.parentElement;
	if (!parentElement)
		throw Error(
			"can't find element of the selection, need to validate selection",
		);
	parentElement.replaceChild(newWrappedElement, selectedNode as Node);

	const wrappedRects: WrappedDOMRect[] = [];
	const selectedRects = selectedElement.getClientRects();
	for (let i = 0; i < selectedRects.length; i++) {
		wrappedRects.push({ rect: selectedRects[i], type: 'main' });
	}

	const leftRects = leftElement.getClientRects();
	for (let i = 0; i < leftRects.length; i++) {
		wrappedRects.push({ rect: leftRects[i], type: 'left' });
	}

	const rightRects = rightElement.getClientRects();
	for (let i = 0; i < rightRects.length; i++) {
		wrappedRects.push({ rect: rightRects[i], type: 'right' });
	}

	const selectedSentence = innerText.slice(startSentence, endSentence + 1);

	return {
		text: text.trim(),
		sentence: selectedSentence.trim(),
		wrappedRects,
		resetInspecting: () => {
			parentElement.replaceChild(selectedNode as Node, newWrappedElement);
		},
	};
};

export const isSingeSelection = (selection: Selection) => {
	return (
		selection.rangeCount === 1 &&
		selection.anchorNode === selection.focusNode
	);
};

export const isValidTextNode = (node: Node | null) => {
	return node && node.nodeType === Node.TEXT_NODE && node.nodeValue;
};

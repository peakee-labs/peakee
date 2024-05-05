import { createLogger } from '@peakee/logger';

import { setUtilsLogger } from '../../utils/logger';

import type { WrappedDOMRect } from './types';

export const logger = createLogger('ContentScript');
setUtilsLogger(logger);

export const retrieveSentenceOfWordsInSingleRange = (selection: Selection) => {
	const selectedNode = selection.focusNode as Node;
	if (!isValidTextNode(selectedNode) || !isSingeSelection(selection)) {
		logger.log('not valid selection or not text node');
		return;
	}

	const nodeText = selectedNode?.nodeValue as string;
	const start = Math.min(selection.anchorOffset, selection.focusOffset);
	const end = Math.max(selection.anchorOffset, selection.focusOffset);

	let startSentence = start;
	let endSentence = end;
	while (startSentence > 0 && nodeText[startSentence - 1] !== '.')
		startSentence -= 1;
	while (endSentence < nodeText.length && nodeText[endSentence + 1] !== '.')
		endSentence += 1;

	const selectedElement = document.createElement('span');
	const text = selection.toString();
	selectedElement.innerText = text;

	// left part of the sentence
	const leftElement = document.createElement('span');
	leftElement.innerHTML = nodeText.slice(startSentence, start);

	// right part of the sentence
	const rightElement = document.createElement('span');
	rightElement.innerHTML = nodeText.slice(end, endSentence + 1);

	const newWrappedElement = document.createElement('span');
	newWrappedElement.append(
		nodeText.slice(0, startSentence),
		leftElement,
		selectedElement,
		rightElement,
		nodeText.slice(endSentence + 1),
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

	const selectedSentence = nodeText.slice(startSentence, endSentence + 1);

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

export type SimpleBox = {
	x: number;
	y: number;
	width: number;
	height: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const measure = (ref: any): Promise<SimpleBox> => {
	return new Promise((resolve) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ref.measure((x: any, y: any, width: any, height: any) =>
			resolve({ x, y, width, height }),
		);
	});
};

export const isInside = (box1: SimpleBox, box2: SimpleBox) => {
	if (
		box1.x >= box2.x &&
		box1.x + box1.width <= box2.x + box2.width &&
		box1.y >= box2.y &&
		box1.y + box1.height <= box2.y + box2.height
	) {
		return true;
	}

	return false;
};

import { createLogger } from '@peakee/logger';

export const logger = createLogger('ContentScript');

export type SimpleContext = {
	text: string;
	sentence: string;
	rect: DOMRect;
};

export const showSuggestWithContext = (context: SimpleContext) => {
	logger.log('show suggest');
	const { text, sentence, rect } = context;
	logger.log(text, sentence, rect);
};

export const getSelectedText = () => {
	if (window.getSelection) {
		return window.getSelection();
	} else {
		logger.warn('No window.getSelection method available');
	}
};

export const retrieveSelectionContext = (
	selectedText: string,
	element: HTMLElement,
) => {
	const { innerText } = element;
	const sentences = innerText
		.split('.')
		.map((s) => s.trim())
		.filter(Boolean);

	const selectedSentence = sentences.find((s) => s.includes(selectedText));

	return {
		selectedText: selectedText.trim(),
		currentSentence: selectedSentence || '',
	};
};

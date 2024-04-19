import type { SuggestTextInSentenceResponse } from '@peakee/app/api';

export type Position = {
	left: number;
	top: number;
};

export type Suggestion = SuggestTextInSentenceResponse;

export type SimpleSuggestContext = {
	text: string;
	sentence: string;
};

export type WrappedDOMRect = {
	rect: DOMRect;
	type: 'left' | 'right' | 'main';
};

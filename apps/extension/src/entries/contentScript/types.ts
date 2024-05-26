export type Position = {
	left: number;
	top: number;
};

export type ExplanationContext = {
	phrase: string;
	sentence: string;
};

export type WrappedDOMRect = {
	rect: DOMRect;
	type: 'left' | 'right' | 'main';
};

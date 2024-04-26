export enum Events {
	SIGN_IN = 'SIGN_IN',
	PROXY_REQUEST = 'PROXY_REQUEST',
	REQUEST_TRANSLATE = 'REQUEST_TRANSLATE',
	REQUEST_EXPLAIN = 'REQUEST_EXPLAIN',
}

export enum Channels {
	Popup = 'Popup',
	ContentScript = 'ContentScript',
	NewTab = 'NewTab',
}

export type TranslatePayload = {
	text: string;
	languages: 'vi-en' | 'en-vi';
};

export type ExplainPayload = {
	text: string;
	sentence: string;
};

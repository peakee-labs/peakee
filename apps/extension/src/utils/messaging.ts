/**
 * Define messaging types for communication from all channels/kernels
 */

export enum Events {
	SIGN_IN = 'SIGN_IN',
	REQUEST_TRANSLATE = 'REQUEST_TRANSLATE',
	REQUEST_EXPLAIN = 'REQUEST_EXPLAIN',
	OPEN_PANEL = 'OPEN_PANEL',
}

export enum Channels {
	Popup = 'Popup',
	ContentScript = 'ContentScript',
	SidePanel = 'SidePanel',
	NewTab = 'NewTab',
}

export type TranslatePayload = {
	text: string;
	languages: 'en-vi' | 'vi-en';
};

export type ExplainPayload = {
	phrase: string;
	sentence: string;
};

import { initAssets } from './common';

initAssets({
	authImage: { uri: chrome.runtime.getURL('auth.png') },
	google: { uri: chrome.runtime.getURL('google.png') },
	message: {},
	messageStack: {},
	messagePuzzle: {},
	background: {},
	external: {
		ai: { uri: chrome.runtime.getURL('ai.png') },
		oxford: { uri: chrome.runtime.getURL('oxford.png') },
		yandex: { uri: chrome.runtime.getURL('yandex.png') },
	},
});

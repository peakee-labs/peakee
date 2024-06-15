import { initAssets } from './common';

initAssets({
	authImage: { uri: chrome.runtime.getURL('auth.png') },
	google: { uri: chrome.runtime.getURL('google.png') },
	message: {},
	messageStack: {},
	messagePuzzle: {},
	background: {},
});

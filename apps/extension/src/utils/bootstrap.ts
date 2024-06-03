import { initAppConfig, initAssets } from '@peakee/app';

export const initApp = () => {
	initAssets({
		authImage: { uri: chrome.runtime.getURL('auth.png') },
		google: { uri: chrome.runtime.getURL('google.png') },
		message: {},
		messageStack: {},
		messagePuzzle: {},
		background: {},
	});

	initAppConfig({ PEAKEE_API_URL, PEAKEE_WS_URL, BLINDERS_EXPLORE_URL });
};

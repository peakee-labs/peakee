import { initAppConfig, initAssets } from '@peakee/app';

export const initApp = () => {
	initAssets({
		authImage: { uri: '/images/auth.png' },
		google: { uri: '/images/google.png' },
		message: { uri: '/images/onboarding-start.png' },
		messageStack: { uri: '/images/onboarding-message.png' },
		messagePuzzle: { uri: '/images/onboarding-messagePuzzle.png' },
		background: { uri: 'onboarding-background.png' },
	});

	initAppConfig({
		PEAKEE_API_URL,
		PEAKEE_WS_URL,
		BLINDERS_EXPLORE_URL,
		BLINDERS_PRACTICE_URL,
	});
};

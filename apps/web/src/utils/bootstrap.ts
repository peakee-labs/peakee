import { initAppConfig, initAssets } from '@peakee/app';
import { injectGetJWTFunc } from '@peakee/app/api';

import { auth } from './auth';

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
	});

	injectGetJWTFunc(async () => auth.currentUser?.getIdToken());
};

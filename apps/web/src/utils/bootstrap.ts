import { initAppConfig, initAssets } from '@peakee/app';

export const initApp = () => {
	initAssets({
		authImage: { uri: '/images/auth.png' },
		google: { uri: '/images/google.png' },
	});

	initAppConfig({ PEAKEE_API_URL, PEAKEE_WS_URL });
};

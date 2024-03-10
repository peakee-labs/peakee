import { initAssets } from '@peakee/app';

export const initApp = () => {
	initAssets({
		authImage: { uri: '/images/auth.png' },
		google: { uri: '/images/google.png' },
	});
};

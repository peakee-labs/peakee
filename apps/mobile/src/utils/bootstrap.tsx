import { initAssets } from '@peakee/utils';

export const initApp = () => {
	initAssets({
		authImage: require('assets/auth.png'),
		google: require('assets/google.png'),
		message: require('assets/onboarding-start.png'),
		messageStack: require('assets/onboarding-message.png'),
		messagePuzzle: require('assets/onboarding-messagePuzzle.png'),
		background: require('assets/onboarding-background.png'),
	});

	// injectUtils({
	// 	translate: (text, languages = 'en-vi') => {
	// 		showModalWithComponent(TranslateBottomSheet, {
	// 			id: 'translate-bottom-sheet',
	// 			align: Align.FullBottom,
	// 			showBackdrop: true,
	// 			props: {
	// 				initText: text,
	// 				initLanguages: languages,
	// 			},
	// 		});
	// 	},
	// });
};

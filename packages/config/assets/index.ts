import { initAssets } from './common';

initAssets({
	authImage: require('assets/auth.png'),
	google: require('assets/google.png'),
	message: require('assets/onboarding-start.png'),
	messageStack: require('assets/onboarding-message.png'),
	messagePuzzle: require('assets/onboarding-messagePuzzle.png'),
	background: require('assets/onboarding-background.png'),
	external: {
		ai: {
			uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yandex_Translate_icon.svg/2048px-Yandex_Translate_icon.svg.png',
		},
		oxford: {
			uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yandex_Translate_icon.svg/2048px-Yandex_Translate_icon.svg.png',
		},
		yandex: {
			uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yandex_Translate_icon.svg/2048px-Yandex_Translate_icon.svg.png',
		},
	},
});

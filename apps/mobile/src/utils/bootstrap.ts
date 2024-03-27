import Config from 'react-native-config';
import { initAppConfig, initAssets } from '@peakee/app';
import { initOpenAIClient } from '@peakee/chat';
import { showModal } from '@peakee/ui';
import { injectUtils } from '@peakee/utils';

import type { TranslateContext } from './modal/Translate';
import TranslateModal from './modal/Translate';

export const initApp = () => {
	initAssets({
		authImage: { uri: '/images/auth.png' },
		google: { uri: '/images/google.png' },
	});

	initAppConfig({
		PEAKEE_API_URL: Config.PEAKEE_API_URL as string,
		PEAKEE_WS_URL: Config.PEAKEE_WS_URL as string,
	});

	injectUtils({
		translate: (text, languages = 'en-vi') => {
			let snapIndex = 2;
			if (!text) {
				snapIndex = 3;
			}
			showModal<TranslateContext>({
				id: 'translate',
				index: snapIndex,
				snapPoints: ['20%', '40%', '60%', '70%', '90%'],
				useBackdrop: false,
				Component: TranslateModal,
				context: { text, languages },
			});
		},
	});
};

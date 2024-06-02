import { forwardRef } from 'react';
import type { View } from 'react-native';
import Config from 'react-native-config';
import { initAppConfig, initAssets } from '@peakee/app';
import { injectUtils } from '@peakee/utils';
import { Align } from 'empty-modal';
import { showModalWithComponent } from 'empty-modal/state';

import type { WrappedProps as TranslateBottomSheetProps } from './TranslateBottomSheet';
import TranslateBottomSheet from './TranslateBottomSheet';

export const initApp = () => {
	initAssets({
		authImage: require('assets/auth.png'),
		google: require('assets/google.png'),
		message: require('assets/onboarding-start.png'),
		messageStack: require('assets/onboarding-message.png'),
		messagePuzzle: require('assets/onboarding-messagePuzzle.png'),
		background: require('assets/onboarding-background.png'),
	});

	initAppConfig({
		PEAKEE_API_URL: Config.PEAKEE_API_URL as string,
		PEAKEE_WS_URL: Config.PEAKEE_WS_URL as string,
		BLINDERS_EXPLORE_URL: Config.BLINDERS_EXPLORE_URL as string,
	});

	injectUtils({
		translate: (text, languages = 'en-vi') => {
			showModalWithComponent(
				forwardRef<View, TranslateBottomSheetProps>(
					TranslateBottomSheet,
				),
				{
					id: 'translate-bottom-sheet',
					align: Align.FullBottom,
					showBackdrop: true,
					props: {
						initText: text,
						initLanguages: languages,
					},
				},
			);
		},
	});
};

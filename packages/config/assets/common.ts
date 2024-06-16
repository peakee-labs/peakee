import type { ImageSourcePropType } from 'react-native';

export type AppAssets = {
	authImage: ImageSourcePropType;
	google: ImageSourcePropType;
	message: ImageSourcePropType;
	messageStack: ImageSourcePropType;
	messagePuzzle: ImageSourcePropType;
	background: ImageSourcePropType;
	external: {
		oxford: ImageSourcePropType;
		yandex: ImageSourcePropType;
		ai: ImageSourcePropType;
	};
};

export let assets: AppAssets;

export const initAssets = (initAssets: AppAssets) => {
	assets = initAssets;
};

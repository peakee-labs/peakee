import { useEffect, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Platform } from 'react-native';

export type AppAssets = {
	authImage: ImageSourcePropType;
	google: ImageSourcePropType;
};

let appAssets: AppAssets = {} as never;

export const initAssets = (assets: AppAssets) => {
	appAssets = assets;
};

export const useAssets = () => {
	const [assets, setAssets] = useState<AppAssets>({} as AppAssets);
	useEffect(() => {
		if (window || Platform.OS !== 'web') {
			setAssets(appAssets);
		}
	}, []);

	return { assets };
};

import Config from 'react-native-config';

import { initAppConfig } from './common';

initAppConfig({
	PEAKEE_API_URL: Config.PEAKEE_API_URL as string,
	PEAKEE_WS_URL: Config.PEAKEE_WS_URL as string,
	BLINDERS_EXPLORE_URL: Config.BLINDERS_EXPLORE_URL as string,
});

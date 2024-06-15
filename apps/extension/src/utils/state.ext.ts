import { applyPersistReducers } from '@peakee/state';
import createChromeStorage from 'redux-persist-chrome-storage';

// Create a ChromeStorage instance using the chrome runtime and the Sync StorageArea.
const chromeStorage = createChromeStorage(chrome, 'sync');

export const applyPersistAppState = () => {
	applyPersistReducers({
		storage: chromeStorage,
		whitelist: ['user'],
	});
};

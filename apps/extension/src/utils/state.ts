import { applyPersistReducers } from '@peakee/state';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';

export const applyPersistAppState = () => {
	applyPersistReducers({
		storage: createWebStorage('local'),
		whitelist: ['user'],
	});
};

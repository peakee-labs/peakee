import { applyPersistReducers } from '@peakee/app/state';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';

export const applyPersistAppState = () => {
	applyPersistReducers({
		storage: createWebStorage('local'),
		whitelist: ['user'],
	});
};

import { applyPersistReducers } from '@peakee/state';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';

applyPersistReducers({
	storage: createWebStorage('local'),
	whitelist: ['user'],
});

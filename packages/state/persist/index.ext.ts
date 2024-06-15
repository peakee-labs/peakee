import createWebStorage from 'redux-persist/es/storage/createWebStorage';

import { applyPersistReducers } from '../store';

applyPersistReducers({
	storage: createWebStorage('local'),
	whitelist: ['user'],
});

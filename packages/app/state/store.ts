import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth';
import { chatReducer } from './chat';
import { userReducer } from './user';

export const store = configureStore({
	reducer: {
		user: userReducer,
		chat: chatReducer,
		auth: authReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

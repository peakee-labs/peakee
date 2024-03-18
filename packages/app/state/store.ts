import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth';
import { chatReducer } from './chat';
import { notificationsReducer } from './notifications';
import { userReducer } from './user';

// TODO: for public users' profiles, we could create a slice for mutual use of profiles

export const store = configureStore({
	reducer: {
		user: userReducer,
		chat: chatReducer,
		notifications: notificationsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

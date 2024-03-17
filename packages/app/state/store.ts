import { configureStore } from '@reduxjs/toolkit';

import { chatReducer } from './chat';
import { notificationsReducer } from './notifications';
import { userReducer } from './user';

export const store = configureStore({
	reducer: {
		user: userReducer,
		chat: chatReducer,
		notifications: notificationsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

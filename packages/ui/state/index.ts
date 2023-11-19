import { configureStore } from '@reduxjs/toolkit';

import { modalReducer } from './modal';

export const uiStore = configureStore({
	reducer: {
		modal: modalReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

export type UIState = ReturnType<typeof uiStore.getState>;

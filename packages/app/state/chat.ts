import { createSlice } from '@reduxjs/toolkit';

import type { Conversation } from '../types';

export type ChatState = {
	conversationsMap: Record<string, Conversation>;
	conversationsLoading: boolean;
};

const initialState: ChatState = {
	conversationsMap: {},
	conversationsLoading: true,
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		reset: () => ({ ...initialState, conversationsLoading: false }),
	},
});

export const { reset: resetChatState } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;

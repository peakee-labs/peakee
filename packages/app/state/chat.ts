import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		reset: () => initialState,
	},
});

export const { reset: resetChatState } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;

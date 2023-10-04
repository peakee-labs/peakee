import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ChatRoom, Message } from '../types';

export interface ChatState {
	info: ChatRoom;
	messages: Message[];
}

export type ChatMap = Record<string, ChatState>;

const initialState: ChatMap = {};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setMessages: (state, action: PayloadAction<ChatState>) => {
			state[action.payload.info.id] = action.payload;
		},
		addMessage: (
			state,
			action: PayloadAction<{
				roomId: string;
				message: Message;
			}>,
		) => {
			state[action.payload.roomId].messages.push(action.payload.message);
		},
	},
});

export const { addMessage, setMessages } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;

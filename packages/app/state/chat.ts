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
			if (state[action.payload.roomId].messages) {
				state[action.payload.roomId].messages.push(
					action.payload.message,
				);
			} else {
				console.log(
					'Cannot append messages, not found this chat room from map',
				);
			}
		},
		addMessages: (
			state,
			action: PayloadAction<{
				roomId: string;
				messages: Message[];
			}>,
		) => {
			if (state[action.payload.roomId].messages) {
				state[action.payload.roomId].messages.push(
					...action.payload.messages,
				);
			} else {
				console.log(
					'Cannot append messages, not found this chat room from map',
				);
			}
		},
	},
});

export const { setMessages, addMessage, addMessages } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;

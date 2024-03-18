import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Conversation, Message } from '../types';

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
		addMessage: (
			state,
			{
				payload,
			}: PayloadAction<{ conversationId: string; message: Message }>,
		) => {
			const { conversationId, message } = payload;
			if (!state.conversationsMap[conversationId].messages) {
				state.conversationsMap[conversationId].messages = [message];
			} else {
				state.conversationsMap[conversationId].messages?.push(message);
			}
		},
		updateMessage: (
			state,
			{
				payload,
			}: PayloadAction<{
				conversationId: string;
				index: number;
				message: Partial<Message>;
			}>,
		) => {
			const { conversationId, index, message } = payload;
			const messages = state.conversationsMap[conversationId].messages;
			if (!messages) return;
			for (const key in Object.keys(message)) {
				messages[index][key as keyof Message] = message[key as never];
			}
		},
		resolveNewConversation: (
			state,
			{
				payload,
			}: PayloadAction<{ oldId: string; conversation: Conversation }>,
		) => {
			const { oldId, conversation } = payload;
			conversation.messages = state.conversationsMap[oldId].messages;
			state.conversationsMap[oldId] = conversation;
			state.conversationsMap[conversation.id] = conversation;
		},
	},
});

export const {
	reset: resetChatState,
	addMessage,
	updateMessage,
	resolveNewConversation,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Conversation, Message } from '../types';

type LoadStatus = 'unloaded' | 'loading' | 'loaded';

export type ChatState = {
	conversationsMap: Record<string, Conversation>;
	conversationsLoadStatus: LoadStatus;
};

// conversations state: 1. unloaded, 2. loading, 3. loaded, but empty, 4. loaded
const initialState: ChatState = {
	conversationsMap: {},
	conversationsLoadStatus: 'unloaded',
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		reset: () => initialState,
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
				const messages =
					state.conversationsMap[conversationId].messages;
				const isMessageExisted = !!messages?.find((m) => {
					return m.id === message.id;
				});
				if (!isMessageExisted) {
					messages?.unshift(message);
				}
			}
		},
		resolveMessage: (
			state,
			{ payload: message }: PayloadAction<Message>,
		) => {
			const messages =
				state.conversationsMap[message.conversationId].messages;
			if (!messages) return;

			const targetMessageIndex = messages?.findIndex((m) => {
				return m.resolveId === message.resolveId;
			});
			messages[targetMessageIndex] = message;
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
			for (const key of Object.keys(message)) {
				messages[index][key as keyof Message] = message[key as never];
			}
		},
		addConversation: (state, { payload }: PayloadAction<Conversation>) => {
			state.conversationsMap[payload.id] = payload;
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
		updateMessagesOfConversation: (
			state,
			{
				payload,
			}: PayloadAction<{ conversationId: string; messages: Message[] }>,
		) => {
			const { conversationId, messages } = payload;
			state.conversationsMap[conversationId].messages = messages;
		},
		updateConversationsLoading: (
			state,
			{ payload }: PayloadAction<LoadStatus>,
		) => {
			state.conversationsLoadStatus = payload;
		},
		updateLatestMessage: (
			state,
			{
				payload,
			}: PayloadAction<{ conversationId: string; message: Message }>,
		) => {
			const { conversationId, message } = payload;
			state.conversationsMap[conversationId].latestMessage = message;
		},
		updatePendingMessageInput: (
			state,
			{
				payload: { conversationId, input },
			}: PayloadAction<{ conversationId: string; input: string }>,
		) => {
			state.conversationsMap[conversationId].pendingMessageInput = input;
		},
	},
});

export const {
	reset: resetChatState,
	addMessage,
	resolveMessage,
	updateMessage,
	addConversation,
	resolveNewConversation,
	updateMessagesOfConversation,
	updateConversationsLoading,
	updateLatestMessage,
	updatePendingMessageInput,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;

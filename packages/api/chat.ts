import type { Conversation, Message } from '@peakee/types';

import { axios } from './axios';
import { queryFromOptions } from './shared';

export async function createNewIndividualConversation(
	friendId: string,
): Promise<Conversation | undefined> {
	try {
		const { data: conversation } = await axios().post('/conversations', {
			type: 'individual',
			friendId,
		});

		return conversation;
	} catch (error) {
		console.log('Error creating new conversation', error);
	}
}

export async function getConversationById(
	id: string,
): Promise<Conversation | undefined> {
	try {
		const { data: conversations } = await axios().get<Conversation>(
			`/conversations/${id}`,
		);

		return conversations;
	} catch (error) {
		console.log('Error getting conversation by id', error);
	}
}

type GetConversationOptions = {
	type?: 'all' | 'individual' | 'group';

	/**
	 * used with type: 'individual'
	 */
	friendId?: string;
};

export async function getConversations(
	options?: GetConversationOptions,
): Promise<Conversation[]> {
	try {
		const query = queryFromOptions(options);
		const { data: conversations } = await axios().get<Conversation[]>(
			`/conversations?${query}`,
		);

		return conversations;
	} catch (error) {
		console.log('Error getting conversations', error);
		return [];
	}
}

export async function getMessages(conversationId: string): Promise<Message[]> {
	try {
		const { data: messages } = await axios().get<Message[]>(
			`/conversations/${conversationId}/messages`,
		);

		return messages;
	} catch (error) {
		console.log('Error getting messages', error);
		return [];
	}
}

export async function getLatestMessage(
	conversationId: string,
): Promise<Message | undefined> {
	try {
		const { data: messages } = await axios().get<Message[]>(
			`/conversations/${conversationId}/messages?limit=1`,
		);

		if (messages.length > 0) return messages[0];
	} catch (error) {
		console.log('Error getting messages', error);
	}
}

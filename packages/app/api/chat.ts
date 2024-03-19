import type { Conversation } from '../types';

import { axios } from './axios';

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

		console.log(conversations, '<-- conversations from api');

		return conversations;
	} catch (error) {
		console.log('Error getting conversations', error);
		return [];
	}
}

export function queryFromOptions(options?: object) {
	if (options) {
		const query = Object.keys(options).reduce((acc, key, index) => {
			if (options[key as keyof object]) {
				if (index == 0) {
					return key + '=' + options[key as keyof object];
				}

				return acc + '&' + key + '=' + options[key as keyof object];
			} else return acc;
		}, '');

		return query;
	} else {
		return '';
	}
}

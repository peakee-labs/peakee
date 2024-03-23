import type { Conversation } from '../types';

import { sortByNewestUpdatedConversation } from './useConversations';

test('sortByNewestUpdatedConversation', () => {
	const conversations: Conversation[] = [
		{
			latestMessage: {
				createdAt: '2022-01-01T00:00:00.000Z',
			},
		} as Conversation,
		{
			latestMessage: {
				createdAt: '2022-01-02T00:00:00.000Z',
			},
		} as Conversation,
		{
			latestMessage: {
				createdAt: '2022-01-03T00:00:00.000Z',
			},
		} as Conversation,
	];

	conversations.sort(sortByNewestUpdatedConversation);
	expect(conversations[0].latestMessage?.createdAt).toBe(
		'2022-01-03T00:00:00.000Z',
	);
	expect(conversations[1].latestMessage?.createdAt).toBe(
		'2022-01-02T00:00:00.000Z',
	);
	expect(conversations[2].latestMessage?.createdAt).toBe(
		'2022-01-01T00:00:00.000Z',
	);
});

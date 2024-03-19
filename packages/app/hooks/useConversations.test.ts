import type { Conversation } from '../types';

import { sortByNewestUpdatedConversation } from './useConversations';

test('sortByNewestUpdatedConversation', () => {
	const conversations: Conversation[] = [
		{
			latestMessageAt: '2022-01-01T00:00:00.000Z',
		} as Conversation,
		{
			latestMessageAt: '2022-01-02T00:00:00.000Z',
		} as Conversation,
		{
			latestMessageAt: '2022-01-03T00:00:00.000Z',
		} as Conversation,
	];

	conversations.sort(sortByNewestUpdatedConversation);
	expect(conversations[0].latestMessageAt).toBe('2022-01-03T00:00:00.000Z');
	expect(conversations[1].latestMessageAt).toBe('2022-01-02T00:00:00.000Z');
	expect(conversations[2].latestMessageAt).toBe('2022-01-01T00:00:00.000Z');
});

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../state';
import type { Conversation } from '../types';

export const useConversations = () => {
	const conversationsMap = useSelector(
		(state: RootState) => state.chat.conversationsMap,
	);

	return useMemo(() => {
		const conversations = Object.values(conversationsMap);
		conversations.sort(sortByNewestUpdatedConversation);

		return conversations;
	}, [conversationsMap]);
};

export const sortByNewestUpdatedConversation = (
	a: Conversation,
	b: Conversation,
) => {
	if (a.latestMessageAt && b.latestMessageAt) {
		const aDate = new Date(a.latestMessageAt);
		const bDate = new Date(b.latestMessageAt);
		return aDate > bDate ? -1 : 1;
	} else if (a.latestMessageAt) {
		return 1;
	} else if (b.latestMessageAt) {
		return -1;
	} else {
		const aDate = new Date(a.updatedAt);
		const bDate = new Date(b.updatedAt);
		return aDate > bDate ? -1 : 1;
	}
};

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getConversations } from '../api';
import {
	type RootState,
	addConversation,
	store,
	updateConversationsLoading,
} from '../state';
import type { Conversation } from '../types';

export const useConversations = () => {
	const { conversationsMap, conversationsLoadStatus } = useSelector(
		(state: RootState) => state.chat,
	);

	useEffect(() => {
		if (conversationsLoadStatus === 'unloaded') {
			store.dispatch(updateConversationsLoading('loading'));
			getConversations().then((conversations) => {
				store.dispatch(updateConversationsLoading('loaded'));
				conversations.forEach((conversation) => {
					store.dispatch(addConversation(conversation));
				});
			});
		}
	}, []);

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
	if (a.latestMessage && b.latestMessage) {
		const aDate = new Date(a.latestMessage.createdAt);
		const bDate = new Date(b.latestMessage.createdAt);
		return aDate > bDate ? -1 : 1;
	} else if (a.latestMessage) {
		return 1;
	} else if (b.latestMessage) {
		return -1;
	} else {
		const aDate = new Date(a.updatedAt);
		const bDate = new Date(b.updatedAt);
		return aDate > bDate ? -1 : 1;
	}
};

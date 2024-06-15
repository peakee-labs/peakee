import {
	getConversationById,
	getConversations,
	getLatestMessage,
	getPublicProfileOfUser,
} from '@peakee/api';
import {
	addConversation,
	setFriendProfile,
	store,
	updateLatestMessage,
} from '@peakee/state';
import type { Conversation } from '@peakee/types';

export const initializeNewConversationState = async (
	conversationId: string,
	friendId: string,
) => {
	const friend = await getFriendProfileWithState(friendId);
	if (!friend) return;
	const userId = store().getState().user.profile?.id;
	if (!userId) return;

	const newConversation: Conversation = {
		id: conversationId,
		members: [{ userId }, { userId: friend.id }] as never,
		createdBy: userId,
		type: 'individual',
		isNotInitialized: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	store().dispatch(addConversation(newConversation));
};

/**
 * first check if this friend is queried in friends state
 * load the public profile if not, dispatch to store, return public profile
 */
export async function getFriendProfileWithState(id: string) {
	let friend = store().getState().user.friendsMap[id];
	if (!friend) {
		const loadedProfile = await getPublicProfileOfUser(id);
		if (!loadedProfile) return;
		friend = loadedProfile;
		store().dispatch(setFriendProfile(friend));
	}

	return friend;
}

export async function getConversationWithState(id: string) {
	const conversation = store().getState().chat.conversationsMap[id];
	if (conversation) return conversation;

	const loadedConversation = await getConversationById(id);
	if (loadedConversation) {
		store().dispatch(addConversation(loadedConversation));
		return loadedConversation;
	}
}

export async function getLatestMessageWithState(conversationId: string) {
	const conversation =
		store().getState().chat.conversationsMap[conversationId];
	if (conversation.latestMessage) return conversation.latestMessage;

	const latestMessage = await getLatestMessage(conversationId);
	if (latestMessage) {
		store().dispatch(
			updateLatestMessage({ conversationId, message: latestMessage }),
		);
	}

	return latestMessage;
}

export async function getFriendConversationWithState(friendId: string) {
	const conversation = Object.values(
		store().getState().chat.conversationsMap,
	).find((c) => {
		return (
			c.type === 'individual' &&
			c.members.find((m) => m.userId === friendId)
		);
	});

	if (conversation) return conversation;

	const conversations = await getConversations({
		type: 'individual',
		friendId,
	});

	if (conversations.length > 0) {
		store().dispatch(addConversation(conversations[0]));
		return conversations[0];
	}
}

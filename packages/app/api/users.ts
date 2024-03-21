import { store } from '../state';
import type { FriendRequest, PublicUserProfile } from '../types';

import { axios } from './axios';
import { queryFromOptions } from './shared';

export async function getPublicProfileOfUser(id: string) {
	try {
		const { data: user } = await axios().get<PublicUserProfile>(
			`/users/${id}?public=true`,
		);

		return user;
	} catch (error) {
		console.error('Error getting public profile of user', error);
	}
}

type GetUsersOptions = {
	email?: string;
};

export async function getUsers(options: GetUsersOptions) {
	try {
		const { data: users } = await axios().get<PublicUserProfile[]>(
			'/users?' + queryFromOptions(options),
		);

		return users;
	} catch (error) {
		console.log('Error getting users', error);
		return [];
	}
}

export async function sendFriendRequest(friendId: string) {
	const userId = store.getState().user.profile?.id;
	if (!userId) return;

	try {
		const { data: request } = await axios().post<FriendRequest>(
			`/users/${userId}/friend-requests`,
			{ friendId },
		);

		return request;
	} catch (error) {
		console.log('Error sending friend request', error);
	}
}

import { store } from '@peakee/state';
import type { FriendRequest } from '@peakee/types';

import { axios } from './axios';

export async function getAllFriendRequests() {
	const userId = store().getState().user.profile?.id;
	if (!userId) return [];

	try {
		const { data: requests } = await axios().get<FriendRequest[]>(
			`/users/${userId}/friend-requests`,
		);

		return requests;
	} catch (error) {
		console.error('Error getting friend requests', error);
		return [];
	}
}

export async function respondFriendRequest(
	requestId: string,
	action: 'accept' | 'deny',
): Promise<boolean> {
	const userId = store().getState().user.profile?.id;
	if (!userId) false;

	try {
		await axios().put(`users/${userId}/friend-requests/${requestId}`, {
			action,
		});

		return true;
	} catch (error) {
		console.error('Error responding to friend request', error);
		return false;
	}
}

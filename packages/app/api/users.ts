import type { PublicUserProfile } from '../types';

import { axios } from './axios';

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

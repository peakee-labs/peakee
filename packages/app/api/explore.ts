import axios from 'axios';

import type { UserExplore } from '../types';
import { config } from '../utils';

export async function getExploreProfileOfUser(id: string) {
	try {
		const { data: user } = await axios.get<UserExplore>(
			`${config().BLINDERS_EXPLORE_URL}/explore/${id}`,
		);
		return user;
	} catch (err) {
		console.log('Error getting explore profile of user', err);
	}
}

export async function getExploreCandidatesForUser() {
	try {
		const { data: explores } = await axios.get<UserExplore[]>(
			`${config().BLINDERS_EXPLORE_URL}/explore/suggest`,
		);
		return explores;
	} catch (err) {
		console.log('Error getting explores for user', err);
	}
}

import axios from 'axios';

import type { UserExplore } from '../types';

import { getJWT } from './token';

export async function getExploreProfileOfUser(id: string) {
	try {
		const { data: user } = await axios.get<UserExplore>(
			`http://localhost:8082/explore/${id}`,
			{
				headers: {
					Authorization: 'Bearer ' + getJWT(),
				},
			},
		);
		return user;
	} catch (err) {
		console.log('Error getting explore profile of user', err);
	}
}

export async function getExploreCandidatesForUser() {
	try {
		const { data: explores } = await axios.get<UserExplore[]>(
			`http://localhost:8082/explore/suggest`,
			{
				headers: {
					Authorization: 'Bearer ' + getJWT(),
				},
			},
		);
		return explores;
	} catch (err) {
		console.log('Error getting explores for user', err);
	}
}

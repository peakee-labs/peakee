import type { AxiosError } from 'axios';
import { isAxiosError } from 'axios';

import type { UserProfile } from '../types';

import { axios } from './axios';

type InitUser = {
	name: string;
	email: string;
	imageUrl: string;
};

export async function getOrInitUserProfile(jwt: string, initUser?: InitUser) {
	try {
		const res = await axios().get<UserProfile>('/users/self', {
			headers: { Authorization: 'Bearer ' + jwt },
		});

		return res.data;
	} catch (error) {
		const isUserNotInitialized =
			isAxiosError(error) &&
			(error as AxiosError).response?.status == 404;

		if (isUserNotInitialized && initUser) {
			const newUserProfile = {
				name: initUser.name,
				email: initUser.email,
				imageUrl: initUser.imageUrl,
			};
			const res = await axios().post<UserProfile>(
				'/users/self',
				newUserProfile,
				{
					headers: { Authorization: 'Bearer ' + jwt },
				},
			);

			return res.data;
		}
	}
}

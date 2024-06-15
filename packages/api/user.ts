import type { UserProfile } from '@peakee/types';
import type { AxiosError } from 'axios';
import { isAxiosError } from 'axios';

import { axios } from './axios';

type InitUser = {
	name: string;
	email: string;
	imageUrl: string;
};

export async function getOrInitUserProfile(initUser?: InitUser) {
	try {
		const res = await axios().get<UserProfile>('/users/self');

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
			);

			return res.data;
		} else {
			console.log('Failed to get or init user profile', error);
		}
	}
}

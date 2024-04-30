import type { reviewWord } from '../types';

import { axios } from './axios';

export type getPracticeUnitFunction = (
	locale?: string,
) => Promise<reviewWord | undefined>;

export const getRandomPracticeWord: getPracticeUnitFunction = async (
	localeCode?: string,
) => {
	try {
		const { data: word } = await axios().get<reviewWord>(
			`/practice/public/unit?lang=${localeCode}`,
		);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
};

export const getPracticeWordForUser: getPracticeUnitFunction = async () => {
	try {
		const { data: word } = await axios().get<reviewWord>(`/practice/unit`);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
};

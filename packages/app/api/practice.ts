import type { explainLog, practiceUnit } from '../types';

import { axios } from './axios';

export const getRandomPracticeWord: (
	locale?: string,
) => Promise<practiceUnit | undefined> = async (localeCode?: string) => {
	try {
		const { data: word } = await axios().get<practiceUnit>(
			`/practice/public/unit?lang=${localeCode}`,
		);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
};

export type getPracticeUnitFunction = (
	locale?: string,
) => Promise<explainLog | undefined>;

export const getPracticeWordForUser: getPracticeUnitFunction = async () => {
	try {
		const { data: word } = await axios().get<explainLog>(`/practice/unit`);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
};

import type { ExplainLog, PracticeUnit } from '../types';

import { axios } from './axios';

export const getRandomPracticeWord = async () => {
	try {
		const { data: word } = await axios().get<PracticeUnit>(
			`/practice/public/unit`,
		);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
};

export const getPracticeWordForUser = async () => {
	try {
		const { data: word } = await axios().get<ExplainLog>(`/practice/unit`);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
};

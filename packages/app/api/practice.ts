import type { reviewWord } from '../types';

import { axios } from './axios';

export async function getRandomPracticeWord(localeCode: string) {
	try {
		const { data: word } = await axios().get<reviewWord>(
			`/practice/unit/random?lang=${localeCode}`,
		);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
}

export async function getPracticeWordForUser() {
	try {
		const { data: word } = await axios().get<reviewWord>(`/practice/unit`);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
}

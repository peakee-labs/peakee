import { default as defaultAxios } from 'axios';

import type { reviewWord } from '../types';
import { config } from '../utils';

import { axios } from './axios';

export async function getRandomPracticeWord(localeCode: string) {
	try {
		const { data: word } = await defaultAxios.get<reviewWord>(
			`${
				config().BLINDERS_PRACTICE_URL
			}/practice/unit?lang=${localeCode}`,
		);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
}

export async function getPracticeWordForUser() {
	try {
		const { data: word } = await axios().get<reviewWord>(
			`${config().BLINDERS_PRACTICE_URL}/practice/unit`,
		);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
}

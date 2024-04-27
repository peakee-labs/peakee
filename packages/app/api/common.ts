import { config } from '../utils';

import { axios } from './axios';

export type TranslateResponse = {
	text: string;
	translated: string;
	languages: string;
};

export async function translate(
	text: string,
	languages: 'en-vi' | 'vi-en',
): Promise<TranslateResponse | undefined> {
	try {
		const res = await axios().get<TranslateResponse>('/translate', {
			params: { text, languages },
		});

		return res.data;
	} catch (error) {
		console.error('Error translating text', error);
	}
}

export type ExplainTextInSentenceResponse = {
	translate: string;
	grammar_analysis: {
		tense: {
			type: string;
			identifier: string;
		};
	};
	expand_words: string[];
	duration_in_seconds: number;
};

export const explainTextInSentence = async (text: string, sentence: string) => {
	const type = 'explain-text-in-sentence';
	const url = config().PEAKEE_API_URL + '/suggest';
	try {
		const res = await fetch(
			`${url}?type=${type}&text=${text}&sentence=${sentence}`,
		);
		const data = await res.json();

		return data as ExplainTextInSentenceResponse;
	} catch (error) {
		console.log('Error getting suggest text in sentence', error);
	}
};

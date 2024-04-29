import { axios } from './axios';

export type TranslateResponse = {
	text: string;
	translated: string;
	languages: string;
};

export type TranslateFunction = (
	text: string,
	languages: 'en-vi' | 'vi-en',
) => Promise<TranslateResponse | undefined>;

export const translate: TranslateFunction = async (text, languages) => {
	try {
		const res = await axios().get<TranslateResponse>('/translate', {
			params: { text, languages },
		});

		return res.data;
	} catch (error) {
		console.error('Error translating text', error);
	}
};

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

export type ExplainFunction = (
	text: string,
	sentence: string,
) => Promise<ExplainTextInSentenceResponse | undefined>;

export const explainTextInSentence: ExplainFunction = async (
	text,
	sentence,
) => {
	const type = 'explain-text-in-sentence';
	try {
		const res = await axios().get<ExplainTextInSentenceResponse>(
			'/suggest',
			{
				params: { type, text, sentence },
			},
		);

		return res.data;
	} catch (error) {
		console.log('Error getting suggest text in sentence', error);
	}
};

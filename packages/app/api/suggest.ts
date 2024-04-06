import { config } from '../utils';

export type SuggestTextInSentenceResponse = {
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

export const getSuggestTextInSentence = async (
	text: string,
	sentence: string,
) => {
	const type = 'explain-text-in-sentence';
	const url = config().PEAKEE_API_URL + '/suggest';
	try {
		const res = await fetch(
			`${url}?type=${type}&text=${text}&sentence=${sentence}`,
		);
		const data = await res.json();

		return data as SuggestTextInSentenceResponse;
	} catch (error) {
		console.log('Error getting suggest text in sentence', error);
	}
};

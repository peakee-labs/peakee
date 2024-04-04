import { axios } from './axios';

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
	try {
		const { data } = await axios().get<SuggestTextInSentenceResponse>(
			'/suggest',
			{
				params: {
					type: 'explain-text-in-sentence',
					text,
					sentence,
				},
			},
		);

		return data;
	} catch (error) {
		console.log('Error getting suggest text in sentence', error);
	}
};

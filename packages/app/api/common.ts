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

/**
 * @deprecated use ExplainPhraseInSentenceResponse
 */
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

/**
 * @deprecated use explainPhraseInSentence, this function calls to legacy suggest API
 */
export const explainTextInSentence = async (
	text: string,
	sentence: string,
): Promise<ExplainTextInSentenceResponse | undefined> => {
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

export type ExplainPhraseInSentenceResponse = {
	translate: string;
	IPA: string;
	grammarAnalysis: {
		tense: {
			type: string;
			identifier: string;
		};
		structure: {
			type: string;
			structure: string;
			for: string;
		};
	};
	keyWords: string[];
	expandWords: string[];
};

export type Explanation = {
	key: string;
	title: string;
	main: string;
	extend?: string;
};

export type ExplanationPrompt = {
	key: string;
	title: string;
	main: string;
	extend?: string;
};

export type ExplanationPrompts = ExplanationPrompt[];

export type Explanations = Explanation[];

export const explainPhraseInSentence = async (
	phrase: string,
	sentence: string,
): Promise<ExplainPhraseInSentenceResponse | undefined> => {
	const type = 'explain-phrase-in-sentence';
	try {
		const res = await axios().get<ExplainPhraseInSentenceResponse>(
			'/suggest/v2',
			{ params: { type, phrase, sentence } },
		);

		return res.data;
	} catch (error) {
		console.log('Error getting suggest phrase in sentence', error);
	}

	return;
};

// {
//     "translate": "một từ vựng ấn tượng",
//     "IPA": "/ən ɪmˈprɛsɪv ˈvɒkəbʊləri wɜːrd/",
//     "grammarAnalysis": {
//         "tense": {
//             "type": "Future Simple",
//             "identifier": "won't be testing, won't care"
//         },
//         "structure": {
//             "type": "Complex Sentence",
//             "structure": "Other people won't do something, and they probably won't do something else",
//             "for": "to express two unlikely actions"
//         }
//     },
//     "keyWords": [
//         "vocabulary",
//         "impressive",
//         "grammar"
//     ],
//     "expandWords": [
//         "sophisticated",
//         "articulate",
//         "erudite"
//     ],
//     "durationInSeconds": 0
// }

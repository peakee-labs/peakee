import { axios } from './axios';

type TranslateResponse = {
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

import OpenAI from 'openai';

let openai: OpenAI;

export const initOpenAIClient = (apiKey: string) => {
	openai = new OpenAI({ apiKey });
	return openai;
};

export const getSuggestions = async (incomingMessages: string[]) => {
	const content = `Messages: [${incomingMessages.join(
		',',
	)}]. Give me 2 instinct English sentences to reply to the above messages. Format: [{"s": ""}]`;
	console.log({ content });

	try {
		const chatCompletion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'system', content: content }],
		});
		return JSON.parse(
			chatCompletion.choices[0].message.content as string,
		).map((ele: never) => ele['s']);
	} catch (e) {
		console.log('error', e);
		return [];
	}
};

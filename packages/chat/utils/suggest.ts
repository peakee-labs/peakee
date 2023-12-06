import type { Message } from '@peakee/db/types';
type suggestionResponse = {
	suggestions: string[];
};

const getChatSuggestion = async (
	messages: Message[],
	token: string,
): Promise<string[]> => {
	const request = {
		messages: messages.map((msg) => ({
			senderId: msg.senderId,
			roomId: msg.roomId,
			content: msg.content,
		})),
	};

	try {
		const response = await fetch(
			'https://i0e7ns9jr3.execute-api.ap-south-1.amazonaws.com/chat',
			{
				method: 'POST',
				headers: {
					ContentType: 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(request),
			},
		);
		if (!response.ok) {
			const text = await response.text();
			throw new Error(`response: ${text}`);
		}
		const responseJSON = await response.json();
		const suggestionRes = responseJSON as suggestionResponse;
		return suggestionRes.suggestions;
	} catch (err) {
		console.log(
			`suggestion: cann't get chat suggestions from server, err: ${err}`,
		);
		return [];
	}
};
export { getChatSuggestion };

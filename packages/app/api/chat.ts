import { axios } from './axios';

export async function createNewIndividualConversation(friendId: string) {
	try {
		const { data: conversation } = await axios().post('/conversations', {
			type: 'individual',
			friendId,
		});

		return conversation;
	} catch (error) {
		console.log('Error creating new conversation', error);
	}
}

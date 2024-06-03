import { createNewIndividualConversation } from '../../api';
import { addMessage, resolveNewConversation, store } from '../../state';
import type { Message } from '../../types';
import { createRandomString } from '../../utils';
import { sendMessage } from '../../websocket';

export const handleSendMessage = async (
	conversationId: string,
	content: string,
) => {
	if (content.length < 1) return;
	const profile = store().getState().user.profile;

	const message: Message = {
		id: createRandomString(),
		content,
		conversationId,
		status: 'initial',
		senderId: profile?.id as string,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		resolveId: createRandomString(),
	};

	store().dispatch(addMessage({ message }));

	const conversation =
		store().getState().chat.conversationsMap[conversationId];
	if (conversation.isNotInitialized) {
		await createNewConversation(conversationId);
		if (!conversation) return;
		// resolveInitialMessages(conversation.id);
	}

	sendMessage({
		content: message.content,
		conversationId: conversation.id,
		resolveId: message.resolveId,
	});
};

export const createNewConversation = async (conversationId: string) => {
	const conversation =
		store().getState().chat.conversationsMap[conversationId];
	if (conversation.type === 'individual') {
		const userId = store().getState().user.profile?.id;
		const friendId = conversation.members.find(
			(member) => userId && userId != member.userId,
		)?.userId;
		if (!friendId) return;
		const newConversation = await createNewIndividualConversation(friendId);

		if (newConversation) {
			store().dispatch(
				resolveNewConversation({
					oldId: conversationId,
					conversation: newConversation,
				}),
			);
		}

		return newConversation;
	} else {
		console.log("Can't create conversation of type", conversation.type);
		return;
	}
};

// export const resolveInitialMessages = (conversationId: string) => {
// 	const updatedConversation =
// 		store().getState().chat.conversationsMap[conversationId];
// 	updatedConversation.messages?.map((message, index) => {
// 		if (message.status !== 'initial') return;
// 		sendMessage({
// 			content: message.content,
// 			conversationId: updatedConversation.id,
// 			resolveId: message.resolveId,
// 		});

// 		store().dispatch(
// 			updateMessage({
// 				conversationId: updatedConversation.id,
// 				index,
// 				message: {
// 					status: 'pending',
// 					conversationId: updatedConversation.id,
// 				},
// 			}),
// 		);
// 	});
// };

import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { createNewIndividualConversation, getMessages } from '../../api';
import type { RootState } from '../../state';
import {
	addMessage,
	resolveNewConversation,
	store,
	updateMessage,
	updateMessagesOfConversation,
} from '../../state';
import type { Message } from '../../types';
import { createRandomString } from '../../utils';
import { sendMessage } from '../../websocket';

import Header from './Header';
import Input from './Input';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';

type Props = {
	id: string;
	style?: StyleProp<ViewStyle>;
};

/**
 * Always make sure that the conversation state is available
 */
export const ConversationFeature: FC<Props> = ({ id, style }) => {
	const userId = store.getState().user.profile?.id;
	if (!userId) throw Error('User not logged in');

	const conversation = useSelector(
		(state: RootState) => state.chat.conversationsMap[id],
	);
	const initializePromise = useRef<Promise<void>>();
	const dispatch = useDispatch();

	const handleSendMessage = async (content: string) => {
		if (content.length < 1) return;
		const message: Message = {
			id: createRandomString(),
			content,
			conversationId: conversation.id,
			status: 'initial',
			senderId: userId,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			resolveId: createRandomString(),
		};

		if (conversation.isNotInitialized && !initializePromise.current) {
			initializePromise.current = createConversation().then(
				(conversation) => {
					if (!conversation) return;
					resolveInitialMessages(conversation.id);
				},
			);
		}

		if (!conversation.isNotInitialized) {
			message.status = 'pending';
			sendMessage({
				content: message.content,
				conversationId: conversation.id,
				resolveId: message.resolveId,
			});
		}

		dispatch(addMessage({ conversationId: id, message }));
	};

	const createConversation = async () => {
		if (conversation.type === 'individual') {
			const userId = store.getState().user.profile?.id;
			const friendId = conversation.members.find(
				(member) => userId && userId != member.userId,
			)?.userId;
			if (!friendId) return;
			const newConversation = await createNewIndividualConversation(
				friendId,
			);

			if (newConversation) {
				dispatch(
					resolveNewConversation({
						oldId: id,
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

	const resolveInitialMessages = (conversationId: string) => {
		const updatedConversation =
			store.getState().chat.conversationsMap[conversationId];
		updatedConversation.messages?.map((message, index) => {
			if (message.status !== 'initial') return;
			sendMessage({
				content: message.content,
				conversationId: updatedConversation.id,
				resolveId: message.resolveId,
			});

			dispatch(
				updateMessage({
					conversationId: updatedConversation.id,
					index,
					message: {
						status: 'pending',
						conversationId: updatedConversation.id,
					},
				}),
			);
		});
	};

	const renderMessage = ({ item: message }: { item: Message }) => {
		if (message.senderId === userId) {
			return (
				<SentMessage
					message={message.content}
					status={message.status as never}
				/>
			);
		} else {
			return <ReceivedMessage message={message.content} />;
		}
	};

	useEffect(() => {
		if (conversation.isNotInitialized) return;
		getMessages(conversation.id).then((messages) => {
			dispatch(
				updateMessagesOfConversation({
					conversationId: conversation.id,
					messages,
				}),
			);
		});
	}, []);

	return (
		<KeyboardAvoidingView
			style={[styles.container, style]}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 18 : 0}
		>
			<Header conversation={conversation} />

			<FlatList
				style={styles.flatListContainer}
				contentContainerStyle={styles.flatListContentContainer}
				inverted
				data={conversation.messages || []}
				renderItem={renderMessage}
				showsVerticalScrollIndicator={false}
			/>

			<Input onPressSend={handleSendMessage} />
		</KeyboardAvoidingView>
	);
};

export default ConversationFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	flatListContainer: {
		flex: 1,
	},
	flatListContentContainer: {
		flex: 1,
		gap: 2,
	},
});

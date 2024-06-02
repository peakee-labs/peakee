import type { FC } from 'react';
import { useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { AvoidSoftInputView } from 'react-native-avoid-softinput';
import { useDispatch } from 'react-redux';

import { getMessages } from '../../api';
import { store, updateMessagesOfConversation } from '../../state';

import Header from './Header';
import Input from './Input';
import MessageList from './MessageList';

type Props = {
	conversationId: string;
	style?: StyleProp<ViewStyle>;
	onPressBack?: () => void;
	onPressText?: (text: string) => void;
	onPressTranslateTool?: () => void;
	onChangeInputText?: (text: string) => void;
};

/**
 * Always make sure that the conversation state is available
 */
export const ConversationFeature: FC<Props> = ({
	conversationId,
	style,
	onPressBack,
	onPressText,
	onPressTranslateTool,
	onChangeInputText,
}) => {
	const dispatch = useDispatch();

	const initMessages = async () => {
		const conversation =
			store().getState().chat.conversationsMap[conversationId];
		if (conversation.isNotInitialized || conversation.messages) return;
		const messages = await getMessages(conversation.id);
		dispatch(
			updateMessagesOfConversation({
				conversationId: conversation.id,
				messages,
			}),
		);
	};

	useEffect(() => {
		initMessages();
	}, []);

	return (
		<AvoidSoftInputView style={[styles.container, style]}>
			<Header conversationId={conversationId} onPressBack={onPressBack} />
			<MessageList
				conversationId={conversationId}
				onPressText={onPressText}
			/>
			<Input
				conversationId={conversationId}
				onChangeText={onChangeInputText}
				onPressTranslateTool={onPressTranslateTool}
			/>
		</AvoidSoftInputView>
	);
};

export default ConversationFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

import type { FC } from 'react';
import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import type { Message } from '@peakee/db/types';
import { SendIcon } from '@peakee/icons';

import { Header, ReceivedMessage, SentMessage } from './components';

interface Props {
	myId: string;
	roomName: string;
	roomDescription: string;
	roomImage: string;
	messages: Message[];
	onPressBack?: () => void;
	sendMessage: (message: string) => void;
}

export const ChatBox: FC<Props> = ({
	myId,
	messages,
	roomName,
	roomDescription,
	roomImage,
	onPressBack,
	sendMessage,
}) => {
	const [message, setMessage] = useState('');

	const handlePressBack = () => {
		if (onPressBack) onPressBack();
		else {
			console.log('Press back');
		}
	};

	const handleSendMessage = () => {
		sendMessage(message);
		setMessage('');
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<Header
				name={roomName}
				description={roomDescription}
				imageUrl={roomImage}
				onPressBack={handlePressBack}
			/>

			<ScrollView
				style={styles.wrapChatContainer}
				contentContainerStyle={styles.chatContainer}
			>
				<View style={styles.messagesContainer}>
					{messages.map((message, index) => {
						if (message.senderId === myId) {
							return (
								<SentMessage
									key={index}
									message={message.content}
								/>
							);
						} else {
							return (
								<ReceivedMessage
									key={index}
									message={message.content}
								/>
							);
						}
					})}
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						value={message}
						onChangeText={setMessage}
						style={styles.input}
						placeholder="Type a message..."
					/>
					<TouchableOpacity
						style={styles.sendButton}
						onPress={handleSendMessage}
					>
						<SendIcon size={20} color={'#FFFFFF'} />
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default ChatBox;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	wrapChatContainer: {},
	chatContainer: {
		flex: 1,
		flexGrow: 1,
		justifyContent: 'flex-end', // Content will be at the bottom when the keyboard is open
	},
	messagesContainer: {
		rowGap: 10,
		paddingHorizontal: 14,
		paddingBottom: 12,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#ECEBEB',
	},
	inputContainer: {
		gap: 12,
		flexDirection: 'row',
		paddingHorizontal: 14,
		paddingVertical: 10,
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	input: {
		flex: 1,
		backgroundColor: '#F3F6F6',
		padding: 16,
		borderRadius: 12,
	},
	sendButton: {
		height: 40,
		width: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#20A090',
	},
});

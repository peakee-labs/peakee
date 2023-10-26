import type { FC } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import type { Message } from '@peakee/db/types';
import { ChevronRight, SendIcon } from '@peakee/icons';

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
	const scrollViewRef = useRef<ScrollView>(null);

	const handlePressBack = () => {
		if (onPressBack) onPressBack();
		else {
			console.log('Press back');
		}
	};

	const handleSendMessage = () => {
		if (message.length === 0) return;
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
				ref={scrollViewRef}
				contentContainerStyle={styles.chatContainer}
				keyboardShouldPersistTaps="always"
				keyboardDismissMode="interactive"
				onContentSizeChange={() =>
					scrollViewRef.current?.scrollToEnd({ animated: true })
				}
			>
				<View
					style={styles.messagesContainer}
					onTouchStart={Keyboard.dismiss}
				>
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
			</ScrollView>

			<View style={styles.inputContainer}>
				<ChevronRight size={24} color="#000000" />
				<TextInput
					value={message}
					onChangeText={setMessage}
					style={styles.input}
					placeholder="Type a message..."
					onSubmitEditing={handleSendMessage}
					blurOnSubmit={false}
					enablesReturnKeyAutomatically={true}
				/>
				<TouchableOpacity
					style={styles.sendButton}
					onPress={handleSendMessage}
				>
					<SendIcon size={24} color={'#000000'} />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default ChatBox;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	wrapChatContainer: {
		flex: 1,
	},
	chatContainer: {
		flexGrow: 1,
		justifyContent: 'flex-end', // Content will be at the bottom when the keyboard is open
	},
	messagesContainer: {
		rowGap: 10,
		paddingHorizontal: 10,
		paddingVertical: 12,
		backgroundColor: '#FFFFFF',
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
		padding: 10,
		borderRadius: 18,
	},
	sendButton: {
		height: 40,
		width: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

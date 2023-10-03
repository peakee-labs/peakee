import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SendIcon } from '@peakee/icons';

import { ReceivedMessage, SentMessage } from './components';

export const ChatBox = () => {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<ScrollView contentContainerStyle={styles.chatContainer}>
				<View style={styles.messagesContainer}>
					<SentMessage message="Hello Tan, Nice to meet you" />
					<SentMessage message="We have met at Peakee" />
					<ReceivedMessage message="Hi, great! I love your presentation" />
					<ReceivedMessage message="And can you talk more about it?" />
					<SentMessage message="Sure! Peakee is ..." />
					<SentMessage message="A Chat Application which is designed for learning language, like English" />
					<ReceivedMessage message="Wowwwww" />
					<ReceivedMessage message="I'll tell with my friend" />
					<SentMessage message="Yeah! let's do it" />
					<SentMessage message="A Chat Application which is designed for learning language, like English" />
					<ReceivedMessage message="Wowwwww" />
					<ReceivedMessage message="I'll tell with my friend" />
					<SentMessage message="Yeah! let's do it 2" />
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Type a message..."
					/>
					<TouchableOpacity style={styles.sendButton}>
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
	chatContainer: {
		flex: 1,
		flexGrow: 1,
		justifyContent: 'flex-end', // Content will be at the bottom when the keyboard is open
	},
	messagesContainer: {
		rowGap: 10,
		paddingHorizontal: 14,
	},
	inputContainer: {
		marginTop: 20,
		gap: 12,
		flexDirection: 'row',
		paddingHorizontal: 14,
		paddingVertical: 10,
		alignItems: 'center',
		borderColor: '#EEFAF8',
		borderTopWidth: 1,
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

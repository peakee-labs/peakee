import type { FC } from 'react';
import { useRef } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
} from 'react-native';
import type { Message } from '@peakee/db/types';

import { Header, Input, ReceivedMessage, SentMessage } from './components';

interface Props {
	myId: string;
	roomName: string;
	roomDescription: string;
	roomImage: string;
	messages: Message[];
	onPressBack?: () => void;
	sendMessage: (message: string) => void;
	children?: string | boolean | JSX.Element | JSX.Element[];
}

export const ChatBox: FC<Props> = ({
	myId,
	messages,
	roomName,
	roomDescription,
	roomImage,
	onPressBack,
	sendMessage,
	children,
}) => {
	const scrollViewRef = useRef<ScrollView>(null);

	const handlePressBack = () => {
		onPressBack?.();
	};

	const handleSendMessage = (message: string) => {
		if (message.length > 0) sendMessage(message);
	};

	const handleScrollContentChange = () => {
		scrollViewRef.current?.scrollToEnd({ animated: true });
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 18 : 0}
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
				ref={scrollViewRef}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				onContentSizeChange={handleScrollContentChange}
				// onLayout={handleScrollContentChange}
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
				{children}
			</ScrollView>

			<Input onPressSend={handleSendMessage} />
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
		justifyContent: 'flex-end',
		rowGap: 10,
		paddingHorizontal: 10,
		paddingVertical: 12,
	},
});

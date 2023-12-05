import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';
import { store } from '@peakee/app/state';
import { ChatBox, Suggestions } from '@peakee/chat';
import { createNewMessage } from '@peakee/db';
import type { Message } from '@peakee/db/types';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChatRoomScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { roomId } = route.params as never;
	const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);

	const room = useSelector((state: RootState) => state.chat[roomId]);
	const user = useSelector((state: RootState) => state.user.chatData);

	const handleGoBack = () => {
		navigation.goBack();
	};

	const handleSendMessage = (message: string) => {
		createNewMessage({
			roomId: roomId,
			senderId: user?.id as string,
			content: message,
			time: new Date(),
		});
	};

	let roomName: string;
	let roomDescription: string;
	let roomImage: string;
	if (room?.info.type === 'group') {
		roomName = room?.info.name || 'Unknown group';
		roomDescription = 'Group chat';
		roomImage = room?.info.imageUrl as string;
	} else {
		const receiver = store
			.getState()
			.user.friends?.find((ele) => room?.info.members.includes(ele.id));

		roomName = receiver?.name || 'Unknown receiver';
		roomDescription = receiver?.email || '';
		roomImage = receiver?.imageUrl as string;
	}

	useEffect(() => {
		const lastMessage = room.messages[room.messages.length - 1];
		if (lastMessage && lastMessage.senderId !== user?.id) {
			setIncomingMessages([...incomingMessages, lastMessage]);
		} else {
			setIncomingMessages([]);
		}
	}, [room.messages]);

	return (
		<ChatBox
			myId={user?.id as string}
			messages={room?.messages || []}
			roomName={roomName}
			roomDescription={roomDescription}
			roomImage={roomImage}
			onPressBack={handleGoBack}
			sendMessage={handleSendMessage}
		>
			<Suggestions
				user={user}
				incomingMessages={
					incomingMessages.length >= 5
						? incomingMessages.slice(-5)
						: incomingMessages
				}
			/>
		</ChatBox>
	);
};

export default ChatRoomScreen;

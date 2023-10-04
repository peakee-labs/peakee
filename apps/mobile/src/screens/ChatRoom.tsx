import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';
import { ChatBox } from '@peakee/chat';
import { useNavigation, useRoute } from '@react-navigation/native';

import { fetchMessages } from '../utils/firestore';

const ChatRoomScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { roomId, receiverId } = route.params as never;

	const user = useSelector((state: RootState) => state.user.chatData);
	const receiver = useSelector((state: RootState) =>
		state.user.friends?.find((ele) => (ele.id = receiverId)),
	);
	const room = useSelector((state: RootState) => state.chat[roomId]);

	const handleGoBack = () => {
		navigation.goBack();
	};

	const sendMessage = (message: string) => {
		console.log(message);
	};

	useEffect(() => {
		console.log(roomId, '<-- mount room id');
		if (!room) {
			try {
				fetchMessages(roomId);
			} catch (e) {
				console.log(e);
			}
		}
	}, []);

	const roomName = room?.info.name || receiver?.name || 'Unknown';
	const roomDescription = room?.info.name
		? 'Group chat'
		: (receiver?.email as string);
	const roomImage = room?.info.imageUrl || (receiver?.imageUrl as string);

	return (
		<ChatBox
			myId={user?.id as string}
			messages={room?.messages || []}
			roomName={roomName}
			roomDescription={roomDescription}
			roomImage={roomImage}
			onPressBack={handleGoBack}
			sendMessage={sendMessage}
		/>
	);
};

export default ChatRoomScreen;

// const styles = StyleSheet.create({});

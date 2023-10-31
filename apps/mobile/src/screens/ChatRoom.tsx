import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';
import { ChatBox } from '@peakee/chat';
import { createNewMessage } from '@peakee/db';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChatRoomScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { roomId, receiverId } = route.params as never;

	const room = useSelector((state: RootState) => state.chat[roomId]);
	const user = useSelector((state: RootState) => state.user.chatData);
	const receiver = useSelector((state: RootState) =>
		state.user.friends?.find((ele) => ele.id === receiverId),
	);

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
			sendMessage={handleSendMessage}
		/>
	);
};

export default ChatRoomScreen;

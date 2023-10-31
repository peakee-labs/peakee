import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';
import { store } from '@peakee/app/state';
import { ChatBox } from '@peakee/chat';
import { createNewMessage } from '@peakee/db';
import { useRouter } from 'next/router';

const ChatRoomScreen = () => {
	const router = useRouter();
	const { roomId } = router.query as never;

	const room = useSelector((state: RootState) => state.chat[roomId]);
	const user = useSelector((state: RootState) => state.user.chatData);

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

	return (
		<View style={styles.container}>
			{room ? (
				<ChatBox
					myId={user?.id as string}
					messages={room?.messages || []}
					roomName={roomName}
					roomDescription={roomDescription}
					roomImage={roomImage}
					sendMessage={handleSendMessage}
					onPressBack={router.back}
				/>
			) : (
				<View>Loading...</View>
			)}
		</View>
	);
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

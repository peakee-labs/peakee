import type { FC } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import type { ChatRoom, UserChatData } from '@peakee/db/types';
import { Avatar } from '@peakee/ui';

interface Props {
	user: UserChatData;
	chatRooms: ChatRoom[];
	friends: UserChatData[];
	onPressRoom: (room: ChatRoom) => void;
}

export const ChatRooms: FC<Props> = ({
	user,
	chatRooms,
	friends,
	onPressRoom,
}) => {
	return (
		<ScrollView contentContainerStyle={styles.contentContainer}>
			{chatRooms.map((room, index) => {
				const fromUser = room.latestMessage?.senderId === user.id;
				const receiver = friends.find(
					(fr) => fr.id === room.members.find((e) => e !== user.id),
				);
				const chatName = room.name || receiver?.fullName;
				const image = room.imageUrl || receiver?.imageUrl;

				return (
					<TouchableOpacity
						style={styles.roomContainer}
						onPress={() => {
							onPressRoom(room);
						}}
						key={index}
					>
						<Avatar size={60} source={{ uri: image }} />
						<View>
							<Text style={styles.chatName}>{chatName}</Text>
							<Text style={styles.message} key={room.id}>
								{fromUser ? 'You: ' : ''}
								{room.latestMessage?.content}
							</Text>
						</View>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
};

export default ChatRooms;

const styles = StyleSheet.create({
	contentContainer: {
		gap: 16,
	},
	roomContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	chatName: {
		fontSize: 17,
		fontWeight: '500',
		marginBottom: 4,
	},
	message: {
		fontSize: 14,
		opacity: 0.5,
	},
});

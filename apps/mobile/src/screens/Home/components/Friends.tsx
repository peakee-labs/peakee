import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { store } from '@peakee/app/state';
import type { UserChatData } from '@peakee/app/types';
import { Avatar } from '@peakee/ui';
import { useNavigation } from '@react-navigation/native';

import { createNewChatRoom } from '../../../utils/firestore';

interface Props {
	profiles: UserChatData[];
}

export const Friends: FC<Props> = ({ profiles }) => {
	const navigation = useNavigation();
	const handlePressFriend = async (friend: UserChatData) => {
		let room = store
			.getState()
			.user.chatRooms?.find(
				(ele) =>
					ele.members.includes(friend.id) &&
					ele.type === 'individual',
			);

		if (!room) {
			room = await createNewChatRoom({
				type: 'individual',
				members: [
					store.getState().user.chatData?.id as string,
					friend.id,
				],
			});
		}

		navigation.navigate(
			'ChatRoom' as never,
			{
				roomId: room.id,
				receiverId: friend.id,
			} as never,
		);
	};

	return (
		<View style={styles.container}>
			{profiles.map((p, i) => {
				return (
					<TouchableOpacity
						key={i}
						style={styles.profileContainer}
						onPress={() => handlePressFriend(p)}
					>
						<Avatar imageUrl={p.imageUrl} />
						<Text>{p.name}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default Friends;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	profileContainer: {
		alignItems: 'center',
	},
	avatar: {
		height: 50,
		width: 50,
		borderRadius: 25,
		borderWidth: 0.4,
	},
});

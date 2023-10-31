import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';
import { store } from '@peakee/app/state';
import { createNewChatRoom } from '@peakee/db';
import type { ChatRoom, UserChatData } from '@peakee/db/types';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'utils/auth';

import { AddFriend, ChatRooms, Friends, Profile } from './components';

const HomeScreen = () => {
	const user = useSelector((state: RootState) => state.user.chatData);
	const friends = useSelector((state: RootState) => state.user.friends) || [];
	const chatRooms =
		useSelector((state: RootState) => state.user.chatRooms) || [];
	const navigation = useNavigation();

	const handleSignOut = () => {
		signOut();
		navigation.navigate('SignIn' as never);
	};

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
				members: [user?.id as string, friend.id],
			});
		}

		navigation.navigate('ChatRoom' as never, { roomId: room.id } as never);
	};

	const handlePressRoom = (room: ChatRoom) => {
		navigation.navigate('ChatRoom' as never, { roomId: room.id } as never);
	};

	return (
		<View style={styles.container}>
			{user ? (
				<View style={styles.profileContainer}>
					<Profile
						id={user.email}
						name={user.fullName}
						image={user.imageUrl}
					/>
					<Button onPress={handleSignOut} title="Sign out" />
				</View>
			) : (
				<Text>not sign-in</Text>
			)}

			<AddFriend />

			<Friends profiles={friends} onPressFriend={handlePressFriend} />

			<ChatRooms
				user={user as UserChatData}
				friends={friends}
				chatRooms={chatRooms}
				onPressRoom={handlePressRoom}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		padding: 10,
		backgroundColor: '#FFFFFF',
	},
	profileContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	signOutButton: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	chatRoomsContainer: {},
	h1: {
		fontSize: 40,
		fontWeight: '700',
		color: '#000000',
	},
	h2: {
		fontSize: 28,
		fontWeight: '600',
		color: '#000000',
	},
	h3: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000000',
	},
});

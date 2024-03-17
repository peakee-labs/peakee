import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';
import { store } from '@peakee/app/state';
import { createNewChatRoom } from '@peakee/db';
import type { UserChatData } from '@peakee/db/types';
import { useRouter } from 'next/router';

import { AddFriend, Friends, Profile } from './components';

const HomeScreen = () => {
	const userProfile = useSelector((state: RootState) => state.user.profile);
	const friends = useSelector((state: RootState) => state.user.friends);
	const router = useRouter();

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

		router.push(`/chat/${room.id}`);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Peakee</Text>

			{userProfile ? (
				<View style={styles.profileContainer}>
					<Profile
						id={userProfile.email}
						name={userProfile.name}
						image={userProfile.imageURL}
					/>
				</View>
			) : (
				<Text>not sign-in</Text>
			)}

			<Text style={styles.h2}>Friends</Text>
			<View style={styles.friendsContainer}>
				<Friends
					profiles={friends || []}
					onPressFriend={handlePressFriend}
				/>
			</View>

			<AddFriend />

			<Text style={styles.h2}>Chat Rooms</Text>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
	},
	profileContainer: {
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	signOutButton: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	friendsContainer: {
		padding: 10,
	},
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

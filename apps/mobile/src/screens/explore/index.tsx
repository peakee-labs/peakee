import { useEffect, useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { type RootState, store } from '@peakee/app/state';
import { createNewChatRoom, getUserByFirebaseUID } from '@peakee/db';
import type { UserExplore, UserProfile } from '@peakee/db/types';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { throttle } from 'lodash';

import ExploreProfile from './components/ExploreProfile';
import QuoteBanner from './components/quoteBanner';

export interface UserExploreData {
	profile: UserProfile;
	explore: UserExplore;
}

const ExploreScreen = () => {
	const user = useSelector((state: RootState) => state.user.chatData);
	const navigation = useNavigation();
	const [exploreUsers, setExploreUsers] = useState<Array<UserExploreData>>(
		[],
	);

	const handlePressChat = async (friend: UserExplore) => {
		const firebaseFriend = await getUserByFirebaseUID(friend.id);

		if (!firebaseFriend) {
			console.log('user not found');
			return;
		}

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
				members: [user?.id as string, firebaseFriend?.id],
			});
		}
		navigation.navigate('ChatRoom' as never, { roomId: room.id } as never);
	};

	const handleGetSuggestUser = throttle(async () => {
		try {
			const res = await axios.get<{ matchs: Array<UserExplore> }>(
				'http://localhost:8080/match/suggest',
				{
					params: { user: user?.firebaseUid },
				},
			);
			const exploreList: Array<UserExploreData> = res.data.matchs.map(
				(explore) => {
					// TODO: profile should be requested from user service.
					return { profile: MockProfile, explore: explore };
				},
			);
			setExploreUsers(exploreList);
		} catch (e) {
			console.log('get explore error', e);
		}
	});

	useEffect(() => {
		handleGetSuggestUser();
	}, []);

	return (
		<View style={styles.container}>
			<QuoteBanner />
			<Text style={styles.h2}>Who&apos;s around the corner</Text>
			<ScrollView
				contentContainerStyle={styles.exploreList}
				showsVerticalScrollIndicator={false}
			>
				{exploreUsers.map((user, idx) => {
					return (
						<ExploreProfile
							key={idx}
							profile={user.profile}
							explore={user.explore}
							onPressChat={handlePressChat}
						></ExploreProfile>
					);
				})}
			</ScrollView>
			<TouchableOpacity
				style={styles.randomChatButton}
				onPress={handleGetSuggestUser}
			>
				<Text style={styles.randomChatButtonText}>Random Chat</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ExploreScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 10,
		paddingTop: 5,
	},
	exploreList: {
		flexDirection: 'column',
		gap: 20,
		justifyContent: 'flex-start',
		alignItems: 'center',
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
	randomChatButton: {
		backgroundColor: '#FE9E00',
		height: 50,
		width: '100%',
		borderRadius: 20,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	randomChatButtonText: {
		color: '#f9f9f8',
		fontSize: 16,
	},
});

const MockProfile: UserProfile = {
	name: 'Hihi',
	fullName: 'minhdat nguyen dinh',
	email: 'email',
	uid: 'uid',
	imageUrl: 'https://github.com/hnimtadd.png',
};

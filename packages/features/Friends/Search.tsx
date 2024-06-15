import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getUsers, sendFriendRequest } from '@peakee/api';
import type { RootState } from '@peakee/state';
import type { PublicUserProfile } from '@peakee/types';
import { Avatar, Button } from '@peakee/ui';
import { Search } from '@peakee/ui/components';
import { throttle } from 'lodash';

export const FriendSearch = () => {
	const { profile } = useSelector((state: RootState) => state.user);
	const [searchedFriends, setSearchedFriends] = useState<PublicUserProfile[]>(
		[],
	);
	const [addedMap, setAddedMap] = useState<
		Record<string, 'sent' | 'pending' | 'failed'>
	>({});

	const searchByEmail = useCallback(
		throttle(async (text: string) => {
			if (text.trim() === '') {
				setSearchedFriends([]);
				return;
			}
			const users = await getUsers({ email: text });
			if (users.length > 0) {
				setSearchedFriends(users);
			}
		}, 1500),
		[],
	);

	const addFriend = (user: PublicUserProfile) => {
		setAddedMap({ ...addedMap, [user.id]: 'pending' });
		sendFriendRequest(user.id).then((request) => {
			if (request) {
				setAddedMap({ ...addedMap, [user.id]: 'sent' });
			} else {
				setAddedMap({ ...addedMap, [user.id]: 'failed' });
			}
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Friends</Text>
			<Search
				placeHolder="Type an email to search"
				onChangeText={searchByEmail}
			/>

			{searchedFriends.length > 0 && (
				<View style={styles.searchResultsContainer}>
					{searchedFriends.map((user) => {
						return (
							<View style={styles.userContainer} key={user.id}>
								<Avatar
									size={52}
									source={{ uri: user.imageURL }}
								/>
								<View style={styles.userInfoContainer}>
									<Text
										style={styles.userName}
										numberOfLines={1}
									>
										{user.name}
									</Text>
									<Text
										style={styles.userEmail}
										numberOfLines={1}
									>
										{user.email}
									</Text>
								</View>
								{profile?.friends.includes(user.id) ? (
									<Text style={styles.successText}>
										Added
									</Text>
								) : addedMap[user.id] === 'pending' ? (
									<ActivityIndicator />
								) : addedMap[user.id] === 'sent' ? (
									<Text style={styles.successText}>Sent</Text>
								) : addedMap[user.id] === 'failed' ? (
									<Text style={styles.failedText}>
										Failed
									</Text>
								) : (
									<Button
										onPress={() => addFriend(user)}
										style={styles.addButton}
										title="Add friend"
									/>
								)}
							</View>
						);
					})}
				</View>
			)}
		</View>
	);
};

export default FriendSearch;

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
	header: {
		fontSize: 18,
		fontWeight: '500',
	},
	searchResultsContainer: {
		zIndex: 1,
		position: 'absolute',
		backgroundColor: '#fff',
		top: 90,
		left: 0,
		right: 0,
		borderRadius: 20,
		paddingVertical: 20,
		paddingHorizontal: 16,
		elevation: 1,
	},
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	userInfoContainer: {
		flex: 1,
		gap: 3,
		marginRight: 'auto',
	},
	userName: {
		fontSize: 16,
	},
	userEmail: {
		color: '#4d4d4d',
	},
	addButton: {},
	successText: {
		color: '#25ab3d',
	},
	failedText: {
		color: '#ab2525',
	},
	exploreContainer: {
		maxWidth: 700,
		alignSelf: 'center',
	},
});

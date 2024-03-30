import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getUsers, sendFriendRequest } from '@peakee/app/api';
import { Search } from '@peakee/app/components';
import ExploreFeature from '@peakee/app/features/Explore';
import { type RootState } from '@peakee/app/state';
import type { PublicUserProfile } from '@peakee/app/types';
import { Avatar, Button } from '@peakee/ui';
import { throttle } from 'lodash';
import { useRouter } from 'next/router';

import { withAuth, withBottomNavigation } from '../utils/hoc';

export const Friends = () => {
	const {
		user: { profile },
		explore,
	} = useSelector((state: RootState) => state);
	const [searchedFriends, setSearchedFriends] = useState<PublicUserProfile[]>(
		[],
	);
	const [addedMap, setAddedMap] = useState<
		Record<string, 'sent' | 'pending' | 'failed'>
	>({});

	const searchByEmail = useCallback(
		throttle(async (text: string) => {
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

	const router = useRouter();
	useEffect(() => {
		if (!explore.profileLoading && !explore.profile) {
			router.push('/onboarding');
		}
	}, [explore.profileLoading, explore.profile]);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Friends</Text>
			<Search
				placeHolder="Type an email to search"
				onChangeText={searchByEmail}
			/>

			<View style={styles.searchResultsContainer}>
				{searchedFriends.map((user) => {
					return (
						<View style={styles.userContainer} key={user.id}>
							<Avatar size={52} source={{ uri: user.imageURL }} />
							<View style={styles.userInfoContainer}>
								<Text style={styles.userName}>{user.name}</Text>
								<Text style={styles.userEmail}>
									{user.email}
								</Text>
							</View>
							{profile?.friends.includes(user.id) ? (
								<Text style={styles.successText}>Added</Text>
							) : addedMap[user.id] === 'pending' ? (
								<ActivityIndicator />
							) : addedMap[user.id] === 'sent' ? (
								<Text style={styles.successText}>Sent</Text>
							) : addedMap[user.id] === 'failed' ? (
								<Text style={styles.failedText}>Failed</Text>
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
			<View style={styles.exploreContainer}>
				<ExploreFeature />
			</View>
		</View>
	);
};

export default withAuth(withBottomNavigation(Friends));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 14,
		paddingTop: 20,
		gap: 10,
	},
	header: {
		fontSize: 18,
		fontWeight: '500',
	},
	searchResultsContainer: {
		paddingVertical: 10,
	},
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	userInfoContainer: {
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

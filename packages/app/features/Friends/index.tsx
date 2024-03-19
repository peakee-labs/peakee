import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getPublicProfileOfUser } from '../../api';
import { type RootState, setFriendProfile } from '../../state';
import type { PublicUserProfile } from '../../types';

import Friend from './Friend';

const FriendsFeature = () => {
	const {
		profile,
		profileLoading,
		friends: friendsMap,
	} = useSelector((state: RootState) => state.user);
	const friends = useMemo(() => {
		return Object.values(friendsMap);
	}, [friendsMap]);

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const renderFriend = useCallback(
		({ item }: { item: PublicUserProfile }) => {
			return <Friend profile={item} />;
		},
		[],
	);

	useEffect(() => {
		if (!profile?.friends) return;
		if (profile.friends.length === 0) {
			setLoading(false);
		} else {
			profile.friends.map((id) => {
				getPublicProfileOfUser(id).then((user) => {
					if (user) {
						dispatch(setFriendProfile(user));
						console.log('Set friend profile', user);
						setLoading(false);
					}
				});
			});
		}
	}, [profile]);

	return (
		<View>
			{!profileLoading && !profile ? (
				<Text>No profile found</Text>
			) : profileLoading || loading ? (
				<ActivityIndicator />
			) : friends.length == 0 ? (
				<Text>{"Let's add some friends"}</Text>
			) : (
				<FlatList
					contentContainerStyle={styles.listContainer}
					data={friends}
					keyExtractor={(item) => item.id}
					renderItem={renderFriend}
				/>
			)}
		</View>
	);
};

export default FriendsFeature;

const styles = StyleSheet.create({
	listContainer: {
		flexDirection: 'row',
	},
});

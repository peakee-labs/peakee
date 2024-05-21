import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
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

type Props = {
	style?: StyleProp<ViewStyle>;
	handlePressFriend?: (friend: PublicUserProfile) => void;
};

const FriendsFeature: FC<Props> = ({ style, handlePressFriend }) => {
	const { profile, friendsMap } = useSelector(
		(state: RootState) => state.user,
	);
	const friends = useMemo(() => {
		return Object.values(friendsMap);
	}, [friendsMap]);

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const renderFriend = useCallback(
		({ item: friend }: { item: PublicUserProfile }) => {
			return (
				<Friend
					profile={friend}
					onPress={() => handlePressFriend?.(friend)}
				/>
			);
		},
		[],
	);

	useEffect(() => {
		if (!profile?.friends || friends.length > 0) return;
		if (profile.friends.length === 0) {
			setLoading(false);
		} else {
			setLoading(true);
			profile.friends.map((id) => {
				getPublicProfileOfUser(id).then((user) => {
					if (user) {
						dispatch(setFriendProfile(user));
						setLoading(false);
					}
				});
			});
		}
	}, [profile]);

	return (
		<View style={style}>
			{!profile ? (
				<Text>No profile found</Text>
			) : loading ? (
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
		gap: 10,
	},
});

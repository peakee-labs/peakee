import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from '@peakee/icons';

import { getPublicProfileOfUser } from '../../api';
import { type RootState, setFriendProfile } from '../../state';
import type { PublicUserProfile } from '../../types';

import Friend from './Friend';

type Props = {
	style?: StyleProp<ViewStyle>;
	handlePressFriend?: (friend: PublicUserProfile) => void;
	onPressAddFriend?: () => void;
};

const FriendsFeature: FC<Props> = ({
	style,
	handlePressFriend,
	onPressAddFriend,
}) => {
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
		<View style={[styles.container, style]}>
			<View style={styles.addContainer}>
				<TouchableOpacity
					style={styles.addButton}
					onPress={onPressAddFriend}
					hitSlop={14}
				>
					<Plus color={'#ccc'} size={24} strokeWidth="2" />
				</TouchableOpacity>
				<Text style={styles.addText}>Add friend</Text>
			</View>

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
	container: {
		flexDirection: 'row',
		gap: 14,
	},
	listContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	addContainer: {
		alignItems: 'center',
	},
	addButton: {
		width: 48,
		height: 48,
		borderRadius: 48,
		borderWidth: 1,
		borderColor: '#e6e6e6',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f6f6f6',
	},
	addText: {
		color: '#9f9f9f',
	},
});

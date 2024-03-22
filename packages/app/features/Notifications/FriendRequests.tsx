import { useCallback, useEffect } from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getAllFriendRequests } from '../../api';
import type { RootState } from '../../state';
import { setFriendRequests } from '../../state';
import type { FriendRequest as FRType } from '../../types';

import FriendRequest from './FriendRequest';

const FriendRequests = () => {
	const { friendRequests, friendRequestsLoading } = useSelector(
		(state: RootState) => state.notifications,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		getAllFriendRequests().then((requests) => {
			dispatch(setFriendRequests(requests));
		});
	}, []);

	const renderItem = useCallback(
		({ item, index }: { item: FRType; index: number }) => {
			return <FriendRequest index={index} request={item} />;
		},
		[],
	);

	return (
		<View style={styles.container}>
			{friendRequestsLoading ? (
				<ActivityIndicator />
			) : friendRequests.length === 0 ? (
				<Text style={styles.emptyText}>No friend requests</Text>
			) : (
				<FlatList data={friendRequests} renderItem={renderItem} />
			)}
		</View>
	);
};

export default FriendRequests;

const styles = StyleSheet.create({
	container: {},
	emptyText: {
		fontStyle: 'italic',
		color: '#8E8E93',
	},
});

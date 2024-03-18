import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Avatar, Button } from '@peakee/ui';

import { getPublicProfileOfUser, respondFriendRequest } from '../../api';
import {
	removeFriendRequest,
	updateUserProfileOfFriendRequest,
} from '../../state';
import type { FriendRequest as FRType } from '../../types';

type Props = {
	index: number;
	request: FRType;
};

const FriendRequest: FC<Props> = ({ index, request }) => {
	const dispatch = useDispatch();
	const [actionLoading, setActionLoading] = useState(false);

	useEffect(() => {
		if (!request.user) {
			getPublicProfileOfUser(request.from).then((user) => {
				if (!user) return;
				dispatch(updateUserProfileOfFriendRequest({ index, user }));
			});
		}
	}, []);

	if (!request.user) return null;

	const handleAcceptRequest = (action: 'accept' | 'deny') => {
		setActionLoading(true);
		respondFriendRequest(request.id, action).then((success) => {
			if (success) {
				dispatch(removeFriendRequest({ index }));
			}

			setActionLoading(false);
		});
	};

	return (
		<View style={styles.container}>
			<Avatar source={{ uri: request.user.imageURL }} />
			<View>
				<Text>{request.user.name}</Text>
				{actionLoading ? (
					<ActivityIndicator />
				) : (
					<View style={styles.buttonsContainer}>
						<Button
							title="Accept"
							onPress={() => handleAcceptRequest('accept')}
						/>
						<Button
							title="Deny"
							onPress={() => handleAcceptRequest('deny')}
						/>
					</View>
				)}
			</View>
		</View>
	);
};

export default FriendRequest;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
});

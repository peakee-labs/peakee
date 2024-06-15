import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getPublicProfileOfUser, respondFriendRequest } from '@peakee/api';
import { Cancel, Check } from '@peakee/icons';
import {
	removeFriendRequest,
	updateUserProfileOfFriendRequest,
} from '@peakee/state';
import { Avatar } from '@peakee/ui';

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

			<View style={styles.infoContainer}>
				<Text style={styles.nameText} numberOfLines={1}>
					{request.user.name}
				</Text>
				<Text style={styles.emailText} numberOfLines={1}>
					{request.user.email}
				</Text>
			</View>

			{actionLoading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={() => handleAcceptRequest('accept')}
						hitSlop={10}
					>
						<Check color={'#24B200'} strokeWidth="3" size={24} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleAcceptRequest('deny')}
						hitSlop={10}
					>
						<Cancel color={'#ff3333'} strokeWidth="3" size={24} />
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default FriendRequest;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	infoContainer: {
		flex: 1,
		marginRight: 'auto',
	},
	nameText: {
		fontSize: 16,
	},
	emailText: {
		color: '#4d4d4d',
		fontSize: 14,
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 20,
	},
});

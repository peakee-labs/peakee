import { type FC, Fragment, useEffect, useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { MoveLeft, Phone, VerticalDots } from '@peakee/icons';
import { Avatar } from '@peakee/ui';

import { store } from '../../state';
import type { Conversation } from '../../types';
import { getFriendProfileWithState, getUsername } from '../../utils';

interface Props {
	conversation: Conversation;
	onPressBack?: () => void;
}

type Metadata = {
	name: string;
	description: string;
	image: string;
};

export const Header: FC<Props> = ({ conversation, onPressBack }) => {
	const [metadata, setMetadata] = useState<Metadata>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (conversation.type === 'individual') {
			const userId = store().getState().user.profile?.id;
			const friendId = conversation.members.find(
				(member) => member.userId !== userId,
			)?.userId as string;

			setLoading(true);
			getFriendProfileWithState(friendId).then((friend) => {
				if (friend) {
					setMetadata({
						name: friend.name,
						description: getUsername(friend.email),
						image: friend.imageURL,
					});
				}
				setLoading(false);
			});
		} else {
			setMetadata({
				name: conversation.metadata?.name as string,
				description: 'Group chat',
				image: conversation.metadata?.image as string,
			});
		}
	}, [conversation]);

	return (
		<Fragment>
			{loading ? (
				<ActivityIndicator style={styles.loading} />
			) : (
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.backButton}
						onPress={onPressBack}
					>
						<MoveLeft size={20} color={'#000000'} />
					</TouchableOpacity>

					{metadata ? (
						<View style={styles.infoBlock}>
							<Avatar source={{ uri: metadata?.image }} />
							<View style={styles.textContainer}>
								<Text style={styles.name}>
									{metadata?.name}
								</Text>
								<Text style={styles.description}>
									{metadata?.description}
								</Text>
							</View>
						</View>
					) : (
						<Text>Unknown</Text>
					)}

					<View style={styles.iconsBlock}>
						<Phone size={20} color="#000000" />
						<VerticalDots size={20} color="#000000" />
					</View>
				</View>
			)}
		</Fragment>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
		paddingRight: 10,
	},
	loading: {
		marginTop: 20,
		alignSelf: 'center',
	},
	backButton: {
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	textContainer: {
		gap: 2,
	},
	name: {
		fontWeight: '600',
		color: '#000000',
	},
	description: {
		fontSize: 12,
		color: '#7A7A7A',
	},
	iconsBlock: {
		flexDirection: 'row',
		marginLeft: 'auto',
	},
});

import { type FC, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MoveLeft, Phone, VerticalDots } from '@peakee/icons';
import { Avatar } from '@peakee/ui';

import { store } from '../../state';
import type { Conversation } from '../../types';
import { getUsername } from '../../utils';

interface Props {
	conversation: Conversation;
	onPressBack?: () => void;
}

export const Header: FC<Props> = ({ conversation, onPressBack }) => {
	const { name, description, image } = useMemo(() => {
		if (conversation.type === 'individual') {
			const userId = store.getState().user.profile?.id;
			const friendId = conversation.members.find(
				(member) => member.userId !== userId,
			)?.userId as string;

			const friend = store.getState().user.friends[friendId];
			if (!friend) throw Error("Can't find friend");

			return {
				name: friend.name,
				description: getUsername(friend.email),
				image: friend.imageURL,
			};
		} else {
			return {
				name: conversation.metadata?.name as string,
				description: 'Group chat',
				image: conversation.metadata?.image as string,
			};
		}
	}, [conversation]);

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.backButton} onPress={onPressBack}>
				<MoveLeft size={20} color={'#000000'} />
			</TouchableOpacity>

			<View style={styles.infoBlock}>
				<Avatar source={{ uri: image }} />
				<View style={styles.textContainer}>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.description}>{description}</Text>
				</View>
			</View>

			<View style={styles.iconsBlock}>
				<Phone size={20} color="#000000" />
				<VerticalDots size={20} color="#000000" />
			</View>
		</View>
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

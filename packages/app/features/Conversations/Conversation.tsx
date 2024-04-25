import { type FC, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from '@peakee/ui';

import { store } from '../../state';
import type { Conversation as ConversationStateType } from '../../types';
import {
	getFormattedTime,
	getFriendProfileWithState,
	getLatestMessageWithState,
} from '../../utils';

type Props = {
	conversation: ConversationStateType;
	onPress?: (conversation: ConversationStateType) => void;
};

type Metadata = {
	name: string;
	latestMessage?: string;
	latestMessageAt?: Date;
	image: string;
};

export const Conversation: FC<Props> = ({ conversation, onPress }) => {
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
					setMetadata((metadata) => ({
						...metadata,
						name: friend.name,
						image: friend.imageURL,
					}));
				}
				setLoading(false);
			});
			getLatestMessageWithState(conversation.id).then((message) => {
				if (message)
					setMetadata(
						(metadata) =>
							({
								...metadata,
								latestMessage: message.content,
								latestMessageAt: new Date(message.createdAt),
							} as Metadata),
					);
			});
		} else {
			setMetadata({
				name: conversation.metadata?.name as string,
				image: conversation.metadata?.image as string,
			});
		}
	}, [conversation]);

	if (loading || !metadata) return null;

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				onPress?.(conversation);
			}}
		>
			<Avatar size={50} source={{ uri: metadata.image }} />
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{metadata.name}</Text>
				<View style={styles.messageContainer}>
					<Text style={styles.messageText} numberOfLines={1}>
						{metadata.latestMessage || 'No messages'}
					</Text>
					{metadata.latestMessageAt && (
						<Text>
							{' '}
							· {getFormattedTime(metadata.latestMessageAt)}
						</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Conversation;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 10,
	},
	contentContainer: {
		flex: 1,
		alignSelf: 'center',
		gap: 4,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
	},
	messageContainer: {
		flexDirection: 'row',
		flex: 1,
	},
	messageText: {
		flex: 1,
	},
});

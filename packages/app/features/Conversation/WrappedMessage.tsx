import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { Avatar } from '@peakee/ui';

import type { OnSelectionFunction } from '../../components';
import type { RootState } from '../../state';
import type { Message } from '../../types';

import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';

type Props = {
	index: number;
	message: Message;
	onPressText?: (text: string) => void;
	onSelection?: OnSelectionFunction;
};

export const WrappedMessage: FC<Props> = ({
	index,
	message,
	onPressText,
	onSelection,
}) => {
	const messages =
		useSelector(
			(state: RootState) =>
				state.chat.conversationsMap[message.conversationId].messages,
		) || [];
	const profile = useSelector((state: RootState) => state.user.profile);
	const friendProfile = useSelector(
		(state: RootState) => state.user.friendsMap[message.senderId],
	);

	const sendStatus = index <= 2 ? (message.status as never) : undefined;
	const lastIndex = messages.length - 1;
	const isStart =
		index === lastIndex ||
		message.senderId !== messages[index + 1]?.senderId;
	const isEnd =
		index === 0 || message.senderId !== messages[index - 1]?.senderId;
	const type = isStart ? 'start' : isEnd ? 'end' : undefined;

	return (
		<Animated.View layout={LinearTransition}>
			{message.senderId === profile?.id ? (
				<SentMessage
					type={type}
					message={message.content}
					status={sendStatus}
					onPressText={onPressText}
					onSelection={onSelection}
				/>
			) : (
				<ReceivedMessage
					type={type}
					message={message.content}
					onPressText={onPressText}
					prefix={
						isEnd &&
						friendProfile?.imageURL && (
							<View style={styles.avatar}>
								<Avatar
									size={34}
									source={{ uri: friendProfile.imageURL }}
								/>
							</View>
						)
					}
				/>
			)}
		</Animated.View>
	);
};

export default WrappedMessage;

const styles = StyleSheet.create({
	avatar: {
		bottom: -14,
	},
});

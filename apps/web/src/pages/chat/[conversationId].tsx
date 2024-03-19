import type { FC } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
	getConversationWithState,
	getFriendConversationWithState,
	getFriendProfileWithState,
} from '@peakee/app';
import ConversationFeature from '@peakee/app/features/Conversation';
import type { RootState } from '@peakee/app/state';
import { addConversation, store } from '@peakee/app/state';
import type { Conversation } from '@peakee/app/types';
import { useRouter } from 'next/router';

import { withAuth } from '../../utils/hoc';

export const Chat: FC = () => {
	const router = useRouter();
	const conversationId = router.query.conversationId as string;
	const conversation = useSelector(
		(state: RootState) => state.chat.conversationsMap[conversationId],
	);
	const [ready, setReady] = useState(false);
	const dispatch = useDispatch();

	const initializeNewConversationState = async (friendId: string) => {
		const friend = await getFriendProfileWithState(friendId);
		if (!friend) return;
		const userId = store.getState().user.profile?.id;
		if (!userId) return;

		const newConversation: Conversation = {
			id: conversationId,
			members: [{ userId }, { userId: friend.id }] as never,
			createdBy: userId,
			type: 'individual',
			isNotInitialized: true,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		dispatch(addConversation(newConversation));
	};

	useEffect(() => {
		// TODO: navigate to conversation if the conversation exists
		const isNewConversation = conversationId.startsWith('new-');
		if (isNewConversation) {
			const friendId = conversationId.split('-')[1];
			getFriendConversationWithState(friendId).then((conversation) => {
				console.log({ conversation });
				if (conversation) {
					console.log('push');
					router.push(`/chat/${conversation.id}`);
				} else {
					initializeNewConversationState(friendId).finally(() =>
						setReady(true),
					);
				}
			});
		} else {
			getConversationWithState(conversationId);
			setReady(true);
		}
	}, []);

	useEffect(() => {
		if (conversation && conversation.id !== conversationId) {
			router.push(`/chat/${conversationId}`, undefined, {
				shallow: true,
			});
		}
	}, [conversation]);

	return (
		<Fragment>
			{conversation ? (
				<ConversationFeature
					style={styles.container}
					id={conversationId}
				/>
			) : (
				<View style={styles.container}>
					{!ready ? (
						<ActivityIndicator style={styles.loading} />
					) : (
						<Text style={styles.notFound}>Not found</Text>
					)}
				</View>
			)}
		</Fragment>
	);
};

export default withAuth(Chat);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loading: {
		marginVertical: 'auto',
	},
	notFound: {
		marginVertical: 'auto',
		alignSelf: 'center',
		fontSize: 24,
	},
});

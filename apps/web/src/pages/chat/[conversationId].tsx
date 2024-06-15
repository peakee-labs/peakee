import type { FC } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import ConversationFeature from '@peakee/features/Conversation';
import type { RootState } from '@peakee/state';
import {
	getConversationWithState,
	getFriendConversationWithState,
	initializeNewConversationState,
} from '@peakee/utils';
import { useRouter } from 'next/router';

import { withAuth } from '../../utils/hoc';

export const Chat: FC = () => {
	const router = useRouter();
	const conversationId = router.query.conversationId as string;
	const conversation = useSelector(
		(state: RootState) => state.chat.conversationsMap[conversationId],
	);
	const [ready, setReady] = useState(false);

	const initConversation = async () => {
		const isNewConversation = conversationId.startsWith('new-');
		if (isNewConversation) {
			const friendId = conversationId.split('-')[1];
			const conversation = await getFriendConversationWithState(friendId);
			if (conversation) {
				const conversationId = conversation.id;
				router.replace(`chat/${conversationId}`);
			} else {
				await initializeNewConversationState(conversationId, friendId);
			}
		} else {
			await getConversationWithState(conversationId);
		}

		setReady(true);
	};

	useEffect(() => {
		initConversation();
	}, []);

	return (
		<Fragment>
			{conversation ? (
				<ConversationFeature
					style={styles.container}
					conversationId={conversationId}
					onPressBack={router.back}
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

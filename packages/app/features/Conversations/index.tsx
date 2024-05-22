import type { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useConversations } from '../../hooks/useConversations';
import type { Conversation as ConversationStateType } from '../../types';

import Conversation from './Conversation';

type Props = {
	onPressConversation?: (conversation: ConversationStateType) => void;
};

export const ConversationsFeature: FC<Props> = ({ onPressConversation }) => {
	const conversations = useConversations();

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.flatListContainer}
				contentContainerStyle={styles.flatListContentContainer}
				data={conversations}
				keyExtractor={(c) => c.id}
				ListEmptyComponent={() => {
					return (
						<Text style={styles.emptyText}>
							{"Let's add friend and start talking in English"}
						</Text>
					);
				}}
				renderItem={({ item: conversation }) => (
					<Conversation
						conversation={conversation}
						onPress={onPressConversation}
					/>
				)}
			/>
		</View>
	);
};

export default ConversationsFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	flatListContainer: {
		flex: 1,
	},
	flatListContentContainer: {
		flexGrow: 1,
		gap: 4,
	},
	emptyText: {
		color: '#7b7a7a',
	},
});

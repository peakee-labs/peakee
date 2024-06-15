import type { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { Conversation as ConversationStateType } from '@peakee/types';
import { useConversations } from '@peakee/utils/hooks/useConversations';

import Conversation from './Conversation';

type Props = {
	onPressConversation?: (conversation: ConversationStateType) => void;
	EmptyElement?: FC;
};

export const ConversationsFeature: FC<Props> = ({
	onPressConversation,
	EmptyElement,
}) => {
	const conversations = useConversations();

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.flatListContainer}
				contentContainerStyle={styles.flatListContentContainer}
				data={conversations}
				keyExtractor={(c) => c.id}
				ListEmptyComponent={EmptyElement}
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
});

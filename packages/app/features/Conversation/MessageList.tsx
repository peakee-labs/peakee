import { type FC, useCallback } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import type { OnSelectionFunction } from '../../components';
import type { RootState } from '../../state';
import type { Message } from '../../types';

import WrappedMessage from './WrappedMessage';

type Props = {
	conversationId: string;
	onPressText?: (text: string) => void;
	onSelection?: OnSelectionFunction;
};

export const MessageList: FC<Props> = ({
	conversationId,
	onPressText,
	onSelection,
}) => {
	const messages =
		useSelector(
			(state: RootState) =>
				state.chat.conversationsMap[conversationId].messages,
		) || [];

	const renderMessage: ListRenderItem<Message> = useCallback(
		({ item: message, index }) => {
			return (
				<WrappedMessage
					message={message}
					index={index}
					onPressText={onPressText}
					onSelection={onSelection}
				/>
			);
		},
		[],
	);

	return (
		<FlatList
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			data={messages || []}
			renderItem={renderMessage}
			keyExtractor={(item) => item.resolveId || item.id}
			showsVerticalScrollIndicator={false}
			initialNumToRender={20}
			inverted
		/>
	);
};

export default MessageList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 10,
	},
	contentContainer: {
		flexGrow: 1,
		gap: 2,
		paddingHorizontal: 4,
	},
});

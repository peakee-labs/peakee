import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import {
	getConversationWithState,
	getFriendConversationWithState,
	initializeNewConversationState,
} from '@peakee/app';
import type { Selection } from '@peakee/app/components';
import ConversationFeature from '@peakee/app/features/Conversation';
import { updatePendingMessageInput } from '@peakee/app/state';
import type { StackScreenProps } from '@react-navigation/stack';
import { Align } from 'empty-modal';
import { showModalWithComponent } from 'empty-modal/state';
import type { RootStackParamList } from 'utils/navigation';
import TranslateBottomSheet from 'utils/TranslateBottomSheet';

type Props = StackScreenProps<RootStackParamList, 'Conversation'>;

export const ConversationScreen: FC<Props> = ({
	route,
	navigation: { navigate, goBack },
}) => {
	const { top, bottom } = useSafeAreaInsets();
	const [currentSelection, setCurrentSelection] = useState<Selection>();
	const [ready, setReady] = useState(false);
	const dispatch = useDispatch();
	const conversationId = route.params.conversationId;

	const handleTranslateText = useCallback(
		(text = '') => {
			const { cleanModal } = showModalWithComponent(
				TranslateBottomSheet,
				{
					id: 'translate-bottom-sheet',
					align: Align.FullBottom,
					showBackdrop: true,
					props: {
						initText: text,
						initLanguages: 'en-vi',
						onPressUseEnglishText: (text) => {
							dispatch(
								updatePendingMessageInput({
									conversationId,
									input: text,
								}),
							);
							cleanModal();
						},
					},
				},
			);
		},
		[conversationId],
	);

	const handleOnChangeInputText = useCallback(
		(text: string) => {
			dispatch(
				updatePendingMessageInput({
					conversationId,
					input: text,
				}),
			);
		},
		[conversationId],
	);

	const initConversation = async () => {
		const isNewConversation = conversationId.startsWith('new-');
		if (isNewConversation) {
			const friendId = conversationId.split('-')[1];
			const conversation = await getFriendConversationWithState(friendId);
			if (conversation) {
				const conversationId = conversation.id;
				navigate('Conversation', { conversationId });
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

	useEffect(() => {
		console.log(currentSelection);
	}, [currentSelection]);

	return (
		<View
			style={[
				styles.container,
				{ paddingBottom: bottom, paddingTop: top },
			]}
		>
			{ready ? (
				<ConversationFeature
					conversationId={conversationId}
					onPressBack={goBack}
					onPressText={handleTranslateText}
					onPressTranslateTool={handleTranslateText}
					onChangeInputText={handleOnChangeInputText}
					onSelection={setCurrentSelection}
				/>
			) : (
				<ActivityIndicator style={styles.loading} />
			)}
		</View>
	);
};

export default ConversationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
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

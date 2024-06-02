import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
	getConversationWithState,
	getFriendConversationWithState,
	getFriendProfileWithState,
} from '@peakee/app';
import ConversationFeature from '@peakee/app/features/Conversation';
import type { RootState } from '@peakee/app/state';
import {
	addConversation,
	store,
	updatePendingMessageInput,
} from '@peakee/app/state';
import type { Conversation } from '@peakee/app/types';
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
	const conversationId = route.params.conversationId;
	const conversation = useSelector(
		(state: RootState) => state.chat.conversationsMap[conversationId],
	);
	const [ready, setReady] = useState(false);
	const dispatch = useDispatch();

	const initializeNewConversationState = async (friendId: string) => {
		const friend = await getFriendProfileWithState(friendId);
		if (!friend) return;
		const userId = store().getState().user.profile?.id;
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

	const handleTranslateText = (text = '') => {
		const { cleanModal } = showModalWithComponent(TranslateBottomSheet, {
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
		});
	};

	const handleOnChangeInputText = (text: string) => {
		dispatch(
			updatePendingMessageInput({
				conversationId,
				input: text,
			}),
		);
	};

	useEffect(() => {
		// TODO: navigate to conversation if the conversation exists
		const isNewConversation = conversationId.startsWith('new-');
		if (isNewConversation) {
			const friendId = conversationId.split('-')[1];
			getFriendConversationWithState(friendId).then((conversation) => {
				if (conversation) {
					navigate('Conversation', {
						conversationId: conversation.id,
					});
				} else {
					initializeNewConversationState(friendId).finally(() =>
						setReady(true),
					);
				}
			});
		} else {
			getConversationWithState(conversationId).then(() => {
				setReady(true);
			});
		}
	}, []);

	useEffect(() => {
		if (conversation && conversation.id !== conversationId) {
			navigate('Conversation', { conversationId: conversation.id });
		}
	}, [conversation]);

	return (
		<View
			style={[
				styles.container,
				{ paddingBottom: bottom, paddingTop: top },
			]}
		>
			{conversation ? (
				<ConversationFeature
					id={conversationId}
					onPressBack={goBack}
					onPressText={handleTranslateText}
					onPressTranslateTool={handleTranslateText}
					onChangeInputText={handleOnChangeInputText}
				/>
			) : !ready ? (
				<ActivityIndicator style={styles.loading} />
			) : (
				<Text style={styles.notFound}>Not found</Text>
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

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import {
	getConversationWithState,
	getFriendConversationWithState,
	initializeNewConversationState,
} from '@peakee/app';
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
	const conversationId = route.params.conversationId;
	const [ready, setReady] = useState(false);
	const dispatch = useDispatch();

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

import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	BounceInUp,
	BounceOutUp,
	ZoomIn,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import {
	getConversationWithState,
	getFriendConversationWithState,
	initializeNewConversationState,
} from '@peakee/app';
import { explainPhraseInSentence } from '@peakee/app/api';
import type { Selection } from '@peakee/app/components';
import ConversationFeature from '@peakee/app/features/Conversation';
import { updatePendingMessageInput } from '@peakee/app/state';
import { Sparkles } from '@peakee/icons';
import type { StackScreenProps } from '@react-navigation/stack';
import { Align } from 'empty-modal';
import { showModalWithComponent } from 'empty-modal/state';
import ExplanationBottomSheet from 'utils/ExplanationBottomSheet';
import type { RootStackParamList } from 'utils/navigation';
import TranslateBottomSheet from 'utils/TranslateBottomSheet';

type Props = StackScreenProps<RootStackParamList, 'Conversation'>;

export const ConversationScreen: FC<Props> = ({
	route,
	navigation: { navigate, goBack },
}) => {
	const { top, bottom } = useSafeAreaInsets();
	const [currentSelection, setCurrentSelection] = useState<Selection>();
	const [loadingExplanation, setLoadingExplanation] = useState(false);
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

	const handleShowSuggestion = async () => {
		if (!currentSelection) return;
		setLoadingExplanation(true);

		const { text, start, end } = currentSelection;
		const phrase = text.slice(start, end);
		const explanation = await explainPhraseInSentence(phrase, text);

		if (explanation) {
			const { cleanModal } = showModalWithComponent(
				ExplanationBottomSheet,
				{
					id: 'explanation-bottom-sheet',
					align: Align.FullBottom,
					showBackdrop: true,
					props: {
						explanation,
						onClose: () => cleanModal(),
					},
				},
			);
		}

		setLoadingExplanation(false);
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

			{currentSelection && (
				<Animated.View
					style={styles.explainFloatIconContainer}
					entering={BounceInUp.duration(500)}
					exiting={BounceOutUp}
				>
					<Animated.View
						entering={ZoomIn.delay(500).damping(100).mass(100)}
					>
						{loadingExplanation ? (
							<ActivityIndicator
								size={'small'}
								style={{ margin: 4 }}
							/>
						) : (
							<TouchableOpacity
								hitSlop={22}
								onPress={handleShowSuggestion}
							>
								<Sparkles
									size={28}
									color={'#FF7701'}
									strokeWidth="2"
								/>
							</TouchableOpacity>
						)}
					</Animated.View>
				</Animated.View>
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
	explainFloatIconContainer: {
		position: 'absolute',
		backgroundColor: '#f3f1f1',
		right: 20,
		top: 110,
		padding: 10,
		borderRadius: 30,
	},
});

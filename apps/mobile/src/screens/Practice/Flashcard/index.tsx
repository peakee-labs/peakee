import { type FC, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	ZoomIn,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import {
	getFlashCardCollectionById,
	getFlashCardCollectionDefault,
	updateCardStatus,
} from '@peakee/app/api';
import type { RootState } from '@peakee/app/state';
import {
	addFlashcards,
	updateFlashcardViewStatus,
} from '@peakee/app/state/practice';
import type { PracticeFlashCardCollection } from '@peakee/app/types';
import { ChevronLeft, ChevronRight } from '@peakee/icons';
// can not use animation importing from @peakee/app ??????
// import { Flashcard } from '@peakee/app/components';
import type { StackScreenProps } from '@react-navigation/stack';
import DefaultContainer from 'components/DefaultContainer';
import type { PracticeParamList } from 'utils/navigation';

import { Flashcard } from './Flashcard';
import { ColorMapKeys } from './Flashcard';
import Header from './Header';

type Props = StackScreenProps<PracticeParamList, 'Flashcard'>;

export const FlashcardScreen: FC<Props> = ({
	route,
	navigation: { goBack },
}) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const dispatch = useDispatch();
	const { collectionId } = route.params;
	const collectionState = useSelector(
		(root: RootState) =>
			root.practice.flashcardCollectionsMap[collectionId],
	);
	const currentCardRef = useRef<View>(null);
	const cardContainerRef = useRef<View>(null);
	const [renderNext, setRenderNext] = useState(false);
	const [nextCardXOffset, setNextCardXOffset] = useState<number>();
	const [nextCardYOffset, setNextCardYOffset] = useState<number>();
	const nextCardScale = useSharedValue<number>(1);
	const [collection, setCollection] =
		useState<PracticeFlashCardCollection>(collectionState);
	const [currentIndex, setCurrentIndex] = useState<number>();
	const [isLoading, setIsLoading] = useState(true);
	const isEnded = currentIndex === -1;

	useEffect(() => {
		const fetchFlashcardCollection = async (
			collectionId: 'default' | string,
		) => {
			let collection: PracticeFlashCardCollection | undefined;
			if (collectionId == 'default') {
				collection = await getFlashCardCollectionDefault();
			} else {
				collection = await getFlashCardCollectionById(collectionId);
			}

			if (!collection || !collection.flashcards) {
				return;
			}

			// set theme field of each flashcard in collection
			for (let i = 0; i < collection.flashcards.length; i++) {
				if (collection.flashcards[i].theme === undefined) {
					// set theme value to random key in colorMap
					collection.flashcards[i].theme =
						ColorMapKeys[
							Math.floor(Math.random() * ColorMapKeys.length)
						];
				}
			}

			dispatch(
				addFlashcards({
					collectionID: collectionId,
					flashcards: collection.flashcards,
				}),
			);
			setCollection(collection);

			setCurrentIndex(collection.flashcards.length - 1);
			setIsLoading(false);
		};

		if (!collectionState || !collectionState.flashcards) {
			fetchFlashcardCollection(collectionId);
		} else {
			setCurrentIndex(collectionState.flashcards.length - 1);
			setCollection(collectionState);
			setIsLoading(() => false);
		}
	}, []);

	const renderedFlashcards = useMemo(() => {
		return [...(collection?.flashcards || [])].reverse();
	}, [collection]);

	const animatedNextCardStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: nextCardScale.value }],
		};
	});

	const handleOnChangeFlashcard = (ratio: number) => {
		const nextValue = 1 + ratio / 20;
		if (nextValue === 1) {
			nextCardScale.value = withSpring(1);
		} else {
			nextCardScale.value = nextValue;
		}
	};

	const handleUpdateStatus = async (
		cardIdx: number | undefined,
		status: boolean,
	) => {
		if (
			cardIdx == undefined ||
			!collection?.flashcards ||
			cardIdx > collection.flashcards.length - 1
		) {
			return;
		}
		const card = collection.flashcards.at(cardIdx);
		if (!card || status == collection.viewed.includes(card.id)) {
			return;
		}

		const success = await updateCardStatus(collection.id, card.id, status);
		if (success)
			dispatch(
				updateFlashcardViewStatus({
					collectionID: collection.id,
					id: card.id,
					status: status,
				}),
			);
	};

	const handleOk = () => {
		setCurrentIndex((idx) => {
			const newIndex = idx != undefined && idx >= 0 ? idx - 1 : idx;
			handleUpdateStatus(newIndex, true);
			return newIndex;
		});
		setRenderNext(false);
	};

	const handleNotOk = () => {
		setCurrentIndex((idx) => {
			const newIndex = idx != undefined && idx >= 0 ? idx - 1 : idx;
			handleUpdateStatus(newIndex, false);
			return newIndex;
		});
		setRenderNext(false);
	};

	const handleNext = () => {
		handleOk();
	};

	const handleBack = () => {
		setCurrentIndex((idx) =>
			idx != undefined &&
			collection?.flashcards &&
			idx + 1 < collection.flashcards.length
				? idx + 1
				: idx,
		);
		setRenderNext(false);
	};

	useEffect(() => {
		setTimeout(() => {
			if (!currentCardRef.current || !cardContainerRef.current) return;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			currentCardRef.current.measureLayout(
				cardContainerRef.current,
				(left, top, width, height) => {
					const addingXOffset = 50;
					setNextCardXOffset(left + addingXOffset);
					setNextCardYOffset(top + (addingXOffset * height) / width);
				},
			);
		}, 0);
	}, []);

	return (
		<DefaultContainer style={styles.container}>
			<Header collection={collection} />

			<View style={styles.flashcardContainer} ref={cardContainerRef}>
				{isLoading ? (
					<View style={styles.skeletonContainer}>
						<Text style={styles.skeletonText}>
							Hold on tight! Please wait a second...
						</Text>
						<ActivityIndicator size={'large'} />
					</View>
				) : (
					renderedFlashcards?.map((fc, index) => {
						if (currentIndex === index) {
							return (
								<Animated.View
									style={styles.currentCarContainer}
									key={'current' + fc.id}
									entering={ZoomIn.duration(300).withCallback(
										() => runOnJS(setRenderNext)(true),
									)}
								>
									<Flashcard
										key={fc.id}
										ref={currentCardRef}
										onChange={handleOnChangeFlashcard}
										onOk={handleOk}
										onNotOk={handleNotOk}
										front={fc.frontText}
										back={fc.backText}
										theme={fc.theme as never}
									/>
								</Animated.View>
							);
						} else if (
							renderNext &&
							nextCardXOffset &&
							nextCardYOffset &&
							currentIndex != undefined &&
							index < currentIndex
						) {
							return (
								<Animated.View
									key={fc.id}
									style={[
										styles.nextFlashcardContainer,
										{
											left: nextCardXOffset,
											right: nextCardXOffset,
											top: nextCardYOffset,
											bottom: nextCardYOffset,
										},
										animatedNextCardStyle,
									]}
								>
									<Flashcard
										front=""
										back=""
										theme={fc.theme as never}
									/>
								</Animated.View>
							);
						}
					})
				)}
				{isEnded && (
					<View>
						<Text style={styles.endedText}>
							Congrats! You reviewed this collection
						</Text>
						<TouchableOpacity
							style={styles.goBackButton}
							onPress={goBack}
						>
							<Text style={styles.goBackTitle}>Go to Home</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>

			<View style={styles.navigateContainer}>
				{!isEnded && (
					<Fragment>
						<TouchableOpacity
							style={styles.backButton}
							onPress={handleBack}
						>
							<ChevronLeft
								size={40}
								strokeWidth="3"
								color={'#FE7E38'}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.nextButton}
							onPress={handleNext}
						>
							<ChevronRight
								size={40}
								strokeWidth="3"
								color={'#FE7E38'}
							/>
						</TouchableOpacity>
					</Fragment>
				)}
			</View>
		</DefaultContainer>
	);
};

export default FlashcardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	flashcardContainer: {
		flex: 1,
		paddingHorizontal: 16,
		justifyContent: 'center',
	},
	skeletonContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 14,
	},
	skeletonText: {
		fontSize: 20,
		textAlign: 'center',
	},
	currentCarContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	nextFlashcardContainer: {
		flex: 1,
		position: 'absolute',
		justifyContent: 'center',
	},
	navigateContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 20,
	},
	backButton: {
		padding: 10,
		borderRadius: 30,
		backgroundColor: '#FEEFE1',
		justifyContent: 'center',
		alignItems: 'center',
	},
	nextButton: {
		padding: 10,
		borderRadius: 30,
		backgroundColor: '#FEEFE1',
		justifyContent: 'center',
		alignItems: 'center',
	},
	endedText: {
		fontSize: 30,
		textAlign: 'center',
	},
	goBackButton: {
		padding: 10,
		paddingHorizontal: 24,
		borderRadius: 30,
		backgroundColor: '#FEEFE1',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: 20,
	},
	goBackTitle: {
		fontSize: 18,
		fontWeight: '500',
		color: '#FE7E38',
	},
});

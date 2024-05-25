import { type FC, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	ZoomIn,
} from 'react-native-reanimated';
import { ChevronLeft, ChevronRight } from '@peakee/icons';
// can not use animation importing from @peakee/app ??????
// import { Flashcard } from '@peakee/app/components';
import type { StackScreenProps } from '@react-navigation/stack';
import DefaultContainer from 'components/DefaultContainer';
import type { PracticeParamList } from 'utils/navigation';

import { Flashcard } from './Flashcard';
import Header from './Header';
import { collection } from './mock';

type Props = StackScreenProps<PracticeParamList, 'Flashcard'>;

export const FlashcardScreen: FC<Props> = ({ route }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { collectionId } = route.params;
	const currentCardRef = useRef<View>(null);
	const cardContainerRef = useRef<View>(null);
	const [renderNext, setRenderNext] = useState(false);
	const [nextCardXOffset, setNextCardXOffset] = useState<number>();
	const [nextCardYOffset, setNextCardYOffset] = useState<number>();
	const nextCardScale = useSharedValue<number>(1);
	const [currentIndex, setCurrentIndex] = useState(
		collection.flashcards.length - 1,
	);

	const renderedFlashcards = useMemo(() => {
		return collection.flashcards.reverse();
	}, []);

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

	const handleOk = () => {
		setCurrentIndex((idx) => idx - 1);
		setRenderNext(false);
	};

	const handleNotOk = () => {
		setCurrentIndex((idx) => idx - 1);
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
			<Header />

			<View style={styles.flashcardContainer} ref={cardContainerRef}>
				{renderedFlashcards.map((fc, index) => {
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
									front={fc.front}
									back={fc.back}
									theme={fc.theme}
								/>
							</Animated.View>
						);
					} else if (
						renderNext &&
						nextCardXOffset &&
						nextCardYOffset &&
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
								<Flashcard front="" back="" theme={fc.theme} />
							</Animated.View>
						);
					}
				})}
			</View>

			<View style={styles.navigateContainer}>
				<TouchableOpacity style={styles.backButton}>
					<ChevronLeft size={40} strokeWidth="3" color={'#FE7E38'} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.nextButton}>
					<ChevronRight size={40} strokeWidth="3" color={'#FE7E38'} />
				</TouchableOpacity>
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
});

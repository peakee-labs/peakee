import { type FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { ChevronLeft, ChevronRight } from '@peakee/icons';
// can not use animation importing from @peakee/app ??????
// import { Flashcard } from '@peakee/app/components';
import type { StackScreenProps } from '@react-navigation/stack';
import DefaultContainer from 'components/DefaultContainer';
import type { PracticeParamList } from 'utils/navigation';

import { Flashcard } from './Flashcard';
import Header from './Header';

type Props = StackScreenProps<PracticeParamList, 'Flashcard'>;

export const FlashcardScreen: FC<Props> = ({ route }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { collectionId } = route.params;
	const currentCardRef = useRef<View>(null);
	const cardContainerRef = useRef<View>(null);
	const [nextCardXOffset, setNextCardXOffset] = useState<number>();
	const [nextCardYOffset, setNextCardYOffset] = useState<number>();
	const nextCardScale = useSharedValue<number>(1);

	const animatedNextCardStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: nextCardScale.value }],
		};
	});

	const handleOnChangeFlashcard = (ratio: number) => {
		const nextValue = 1 + ratio / 10;
		if (nextValue === 1) {
			nextCardScale.value = withSpring(1);
		} else {
			nextCardScale.value = nextValue;
		}
	};

	useEffect(() => {
		setTimeout(() => {
			if (!currentCardRef.current || !cardContainerRef.current) return;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			currentCardRef.current.measureLayout(
				cardContainerRef.current,
				(left, top, width, height) => {
					const addingXOffset = 30;
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
				{nextCardXOffset && nextCardYOffset && (
					<Animated.View
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
						<Flashcard front="" back="" theme="yellow" />
					</Animated.View>
				)}

				<Flashcard
					ref={currentCardRef}
					onChange={handleOnChangeFlashcard}
					onOk={() => {
						console.log('ok');
					}}
					onNotOk={() => {
						console.log('not ok');
					}}
					front="Hello world 2"
					back="Xin chào"
				/>
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

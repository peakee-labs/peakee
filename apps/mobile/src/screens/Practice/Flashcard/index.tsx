import type { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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

	return (
		<DefaultContainer style={styles.container}>
			<Header />

			<View style={styles.flashcardContainer}>
				<Flashcard front="Hello world" back="Xin chào" />
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

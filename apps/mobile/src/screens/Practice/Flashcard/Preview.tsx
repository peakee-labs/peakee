import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashcardPreview } from '@peakee/app/features/Practice/FlashcardPreview';
import type { PracticeFlashCardCollectionInformation } from '@peakee/app/types';
import { useNavigation } from '@react-navigation/native';

export type Props = {
	collection: PracticeFlashCardCollectionInformation;
};
export const FlashCardPreview: FC<Props> = ({ collection }) => {
	const { navigate } = useNavigation();

	const handlePressLatestFlashcardReview2 = () => {
		navigate('PracticeStack', {
			screen: 'Flashcard',
			params: { collectionId: collection.id },
		});
	};

	return (
		<View style={styles.container}>
			<FlashcardPreview
				name={collection.name}
				description={collection.description}
				reviewedCardCount={
					collection.reviewed ? collection.reviewed.length : 0
				}
				totalCardCount={collection.total ? collection.total.length : 0}
				onPressReview={handlePressLatestFlashcardReview2}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

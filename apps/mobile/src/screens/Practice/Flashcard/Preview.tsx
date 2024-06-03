import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashcardPreview } from '@peakee/app/features/Practice/FlashcardPreview';
import type { PracticeFlashCardCollection } from '@peakee/app/types';
import { useNavigation } from '@react-navigation/native';

export type Props = {
	collection: PracticeFlashCardCollection;
};
export const FlashCardPreview: FC<Props> = ({ collection }) => {
	const { navigate } = useNavigation();

	const handlePressLatestFlashcardReview2 = () => {
		navigate('PracticeStack', {
			screen: 'Flashcard',
			params: { collectionId: collection.id },
		});
	};
	const viewed = collection.viewed ? collection.viewed.length : 0;
	const total = collection.total ? collection.total.length : 0;

	return (
		<View style={styles.container}>
			<FlashcardPreview
				name={collection.name}
				description={collection.description}
				reviewedCardCount={viewed}
				totalCardCount={total}
				onPressReview={handlePressLatestFlashcardReview2}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

import { StyleSheet, Text, View } from 'react-native';
import { FlashcardPreview } from '@peakee/app/features/Practice/FlashcardPreview';
import { useNavigation } from '@react-navigation/native';

export const LatestReview = () => {
	const { navigate } = useNavigation();

	const handlePressLatestFlashcardReview2 = () => {
		navigate('PracticeStack', {
			screen: 'Flashcard',
			params: { collectionId: 'default' },
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>My latest review</Text>
			<FlashcardPreview
				name="Hello world"
				description="Say hello to the world"
				reviewedCardCount={30}
				totalCardCount={35}
				onPressReview={handlePressLatestFlashcardReview2}
			/>
		</View>
	);
};

export default LatestReview;

const styles = StyleSheet.create({
	container: {},
	title: {
		color: '#484C52',
		fontSize: 17,
		fontWeight: '500',
		marginBottom: 10,
	},
});

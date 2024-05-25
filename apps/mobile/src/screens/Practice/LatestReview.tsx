import { StyleSheet, Text, View } from 'react-native';
import { FlashcardPreview } from '@peakee/app/features/Practice/FlashcardPreview';

export const LatestReview = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>My latest review</Text>
			<FlashcardPreview
				name="Hello world"
				description="Say hello to the world"
				reviewedCardCount={30}
				totalCardCount={35}
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

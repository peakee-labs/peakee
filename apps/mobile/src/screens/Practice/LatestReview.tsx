import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';

import { FlashCardPreview } from './Flashcard/Preview';

export const LatestReview = () => {
	const { flashcardCollectionsMap } = useSelector(
		(state: RootState) => state.practice,
	);
	const latestCollection = Object.values(flashcardCollectionsMap).sort(
		(a, b) => b.updatedAt - a.updatedAt,
	)[0];

	if (
		latestCollection &&
		latestCollection.flashcards &&
		latestCollection.flashcards.findIndex((f) => f.isViewed) !== -1
	) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>My latest review</Text>
				<FlashCardPreview collection={latestCollection} />
			</View>
		);
	}
	return <></>;
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

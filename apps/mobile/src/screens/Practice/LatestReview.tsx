import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/state';

import { FlashCardPreview } from './Flashcard/Preview';

export const LatestReview = () => {
	const { flashcardCollectionsMap } = useSelector(
		(state: RootState) => state.practice,
	);

	const latestCollection = useMemo(() => {
		const sorted = Object.values(flashcardCollectionsMap)
			.filter((col) => {
				return col.viewed.length > 0;
			})
			.sort((a, b) => b.updatedAt - a.updatedAt);
		if (sorted.length > 0) {
			return (
				<View style={styles.container}>
					<Text style={styles.title}>My latest review</Text>
					<FlashCardPreview collection={sorted[0]} />
				</View>
			);
		}
	}, [flashcardCollectionsMap]);

	return latestCollection;
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

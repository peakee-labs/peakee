import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';

import { FlashCardPreview } from './Flashcard/Preview';

export const PendingReview = () => {
	const { pendingCollection } = useSelector(
		(state: RootState) => state.practice,
	);

	return pendingCollection ? (
		<View style={styles.container}>
			<Text style={styles.title}>This collection is waiting for you</Text>
			<FlashCardPreview collection={pendingCollection} />
		</View>
	) : null;
};

export default PendingReview;

const styles = StyleSheet.create({
	container: {},
	title: {
		color: '#484C52',
		fontSize: 17,
		fontWeight: '500',
		marginBottom: 10,
	},
});

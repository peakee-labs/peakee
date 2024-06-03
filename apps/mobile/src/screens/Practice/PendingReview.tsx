import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { syncPendingExplainLog } from '@peakee/app/api';
import PendingFlashcardPreview from '@peakee/app/features/Practice/PendingFlashcardPreview';
import type { RootState } from '@peakee/app/state';
import { addCollection } from '@peakee/app/state/practice';
import { useNavigation } from '@react-navigation/native';

export const PendingReview = () => {
	const { pendingCollection } = useSelector(
		(state: RootState) => state.practice,
	);
	const { navigate } = useNavigation();
	const dispatch = useDispatch();

	const handlePressCreateNow = async () => {
		const collection = await syncPendingExplainLog();
		if (!collection) return;
		dispatch(addCollection(collection));
		navigate('PracticeStack', {
			screen: 'Flashcard',
			params: { collectionId: collection.id },
		});
	};
	console.log(pendingCollection);

	return pendingCollection && pendingCollection.count ? (
		<View style={styles.container}>
			<PendingFlashcardPreview
				numLog={pendingCollection.count}
				since={new Date(pendingCollection.from).toLocaleDateString()}
				onPress={handlePressCreateNow}
			/>
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

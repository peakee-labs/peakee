import { type FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';

import { FlashCardPreview } from './Flashcard/Preview';

export const CollectionPreviews: FC = () => {
	const { flashcardCollectionsMap } = useSelector(
		(state: RootState) => state.practice,
	);
	const renderedCollections = useMemo(() => {
		return Object.values(flashcardCollectionsMap)
			.sort((a, b) => b.updatedAt - a.updatedAt)
			.map((collection) => (
				<FlashCardPreview
					key={'collection' + collection.id}
					collection={collection}
				/>
			));
	}, [flashcardCollectionsMap]);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>My Collections</Text>
			{renderedCollections}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
	title: {
		color: '#484C52',
		fontSize: 17,
		fontWeight: '500',
		marginBottom: 10,
	},
});

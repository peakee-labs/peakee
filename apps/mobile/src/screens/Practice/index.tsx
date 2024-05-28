import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getFlashCardCollectionsInformation } from '@peakee/app/api';
import type { PracticeFlashCardCollectionInformation } from '@peakee/app/types';
import DefaultContainer from 'components/DefaultContainer';

import { CollectionPreviews } from './CollectionPreview';
import Header from './Header';
import LatestReview from './LatestReview';

export const PracticeScreen = () => {
	const [collections, setCollections] = useState<
		PracticeFlashCardCollectionInformation[]
	>([]);

	useEffect(() => {
		const fetchCollections = async () => {
			const collections = await getFlashCardCollectionsInformation();
			if (collections) {
				setCollections(collections);
			}
		};
		fetchCollections();
	}, []);

	return (
		<DefaultContainer style={styles.container}>
			<Header />
			<LatestReview />
			<CollectionPreviews collections={collections} />
		</DefaultContainer>
	);
};

export default PracticeScreen;

const styles = StyleSheet.create({
	container: {
		gap: 14,
	},
});

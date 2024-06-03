import { useCallback, useEffect, useState } from 'react';
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
	fetchPendingExplainStatus,
	getFlashCardCollectionsInformation,
} from '@peakee/app/api';
import {
	addCollectionsInformation,
	addPendingCollection,
} from '@peakee/app/state/practice';
import DefaultContainer from 'components/DefaultContainer';

import { CollectionPreviews } from './CollectionPreview';
import Header from './Header';
import LatestReview from './LatestReview';
import PendingReview from './PendingReview';

export const PracticeScreen = () => {
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();
	const fetchCollections = async () => {
		const collections = await getFlashCardCollectionsInformation();
		if (collections) {
			dispatch(addCollectionsInformation(collections));
		}
		const pendingCollection = await fetchPendingExplainStatus();
		if (pendingCollection) {
			dispatch(addPendingCollection(pendingCollection));
		}
		setLoading(false);
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchCollections().finally(() => {
			setRefreshing(false);
		});
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchCollections();
	}, []);

	return (
		<DefaultContainer style={styles.container}>
			<Header />
			{loading ? (
				<ActivityIndicator />
			) : (
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
					contentContainerStyle={styles.collectionsContainer}
				>
					<LatestReview />
					<PendingReview />
					<CollectionPreviews />
				</ScrollView>
			)}
		</DefaultContainer>
	);
};

export default PracticeScreen;

const styles = StyleSheet.create({
	container: {
		gap: 14,
	},
	collectionsContainer: {
		gap: 14,
	},
});

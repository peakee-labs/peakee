import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicProfileOfUser } from '@peakee/app/api';
import {
	type RootState,
	addExploreCandidate,
	setExploreProfile,
	store,
} from '@peakee/app/state';
import type { PublicUserProfile, UserExplore } from '@peakee/app/types';

import {
	getExploreCandidatesForUser,
	getExploreProfileOfUser,
} from '../../api/explore';

import ExploreProfile from './ExploreProfile';
import QuoteBanner from './QuoteBanner';

export interface UserExploreData {
	profile: PublicUserProfile;
	explore: UserExplore;
}

const ExploreFeature: FC = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const { candidatesMap } = useSelector((state: RootState) => state.explore);
	const exploreCandidates = useMemo(
		() => Object.values(candidatesMap),
		[candidatesMap],
	);

	const handleGetSuggestUser = async () => {
		try {
			const candidates = await getExploreCandidatesForUser();
			if (!candidates) {
				return;
			}
			for (const candidate of candidates) {
				const publicProfile = await getPublicProfileOfUser(
					candidate.userId,
				);
				if (publicProfile) {
					dispatch(
						addExploreCandidate({
							profile: publicProfile,
							explore: candidate,
						}),
					);
				}
				setLoading(false);
			}
		} catch (e) {
			console.log('get explore error', e);
		}
	};

	const renderExplore = useCallback(({ item }: { item: UserExploreData }) => {
		return <ExploreProfile explore={item.explore} profile={item.profile} />;
	}, []);

	const fetchUserExplore = async () => {
		const id = store().getState().user.profile?.id;
		if (!id) throw Error('needed user profile from this screen');
		const exploreProfile = await getExploreProfileOfUser(id);
		if (exploreProfile) {
			dispatch(setExploreProfile(exploreProfile));
		}
	};

	useEffect(() => {
		setLoading(true);
		fetchUserExplore();
		handleGetSuggestUser().then(() => setLoading(false));
	}, []);

	return (
		<View style={styles.container}>
			<QuoteBanner />
			<Text style={styles.h2}>Who&apos;s around the corner</Text>
			{!loading ? (
				<FlatList
					style={{ flex: 1 }}
					data={exploreCandidates}
					renderItem={renderExplore}
					contentContainerStyle={styles.exploreList}
					keyExtractor={(item) => item.profile.id}
				/>
			) : (
				<View style={{ flex: 1 }}>
					<ActivityIndicator />
				</View>
			)}
		</View>
	);
};

export default ExploreFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		justifyContent: 'space-between',
	},
	exploreList: {
		flex: 1,
		paddingVertical: 10,
		gap: 20,
	},
	h1: {
		fontSize: 40,
		fontWeight: '700',
	},
	h2: {
		fontSize: 28,
		fontWeight: '600',
	},
	h3: {
		fontSize: 18,
		fontWeight: '600',
	},
	randomChatButton: {
		backgroundColor: '#FE9E00',
		height: 50,
		width: '100%',
		borderRadius: 20,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	randomChatButtonText: {
		color: '#f9f9f8',
		fontSize: 16,
	},
});

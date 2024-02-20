import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { UserExplore, UserProfile } from '@peakee/db/types';

import ExploreProfile from './components/ExploreProfile';

export interface UserExploreData {
	profile: UserProfile;
	explore: UserExplore;
}

const ExploreScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Explore Screen</Text>
			<ScrollView
				contentContainerStyle={styles.exploreList}
				showsVerticalScrollIndicator={false}
			>
				{MockUser.map((user, idx) => {
					return (
						<ExploreProfile
							key={idx}
							profile={user.profile}
							explore={user.explore}
						></ExploreProfile>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default ExploreScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		backgroundColor: '#FFFFFF',
	},
	exploreList: {
		flexDirection: 'column',
		gap: 15,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	h1: {
		fontSize: 40,
		fontWeight: '700',
		color: '#000000',
	},
	h2: {
		fontSize: 28,
		fontWeight: '600',
		color: '#000000',
	},
	h3: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000000',
	},
});

const MockUser: Array<UserExploreData> = [
	{
		profile: {
			name: 'Hihi',
			fullName: 'minhdat nguyen dinh',
			email: 'email',
			uid: 'uid',
			imageUrl: 'https://github.com/hnimtadd.png',
		},
		explore: {
			major: 'student',
			country: 'vn',
			learning: ['vietnamese', 'english'],
			interests: ['football', 'running'],
			like: 10,
		},
	},
	{
		profile: {
			name: 'Hihi',
			fullName: 'minhdat nguyen dinh',
			email: 'email',
			uid: 'uid',
			imageUrl: 'https://github.com/hnimtadd.png',
		},
		explore: {
			major: 'student',
			country: 'vn',
			learning: ['vietnamese', 'english'],
			interests: ['football', 'running'],
			like: 10,
		},
	},
	{
		profile: {
			name: 'Hihi',
			fullName: 'minhdat nguyen dinh',
			email: 'email',
			uid: 'uid',
			imageUrl: 'https://github.com/hnimtadd.png',
		},
		explore: {
			major: 'student',
			country: 'vn',
			learning: ['vietnamese', 'english'],
			interests: ['football', 'running'],
			like: 10,
		},
	},
	{
		profile: {
			name: 'Hihi',
			fullName: 'minhdat nguyen dinh',
			email: 'email',
			uid: 'uid',
			imageUrl: 'https://github.com/hnimtadd.png',
		},
		explore: {
			major: 'student',
			country: 'vn',
			learning: ['vietnamese', 'english'],
			interests: ['football', 'running'],
			like: 10,
		},
	},
	{
		profile: {
			name: 'Hihi',
			fullName: 'minhdat nguyen dinh',
			email: 'email',
			uid: 'uid',
			imageUrl: 'https://github.com/hnimtadd.png',
		},
		explore: {
			major: 'student',
			country: 'vn',
			learning: ['vietnamese', 'english'],
			interests: ['football', 'running'],
			like: 10,
		},
	},
	{
		profile: {
			name: 'Hihi',
			fullName: 'minhdat nguyen dinh',
			email: 'email',
			uid: 'uid',
			imageUrl: 'https://github.com/hnimtadd.png',
		},
		explore: {
			major: 'student',
			country: 'vn',
			learning: ['vietnamese', 'english'],
			interests: ['football', 'running'],
			like: 10,
		},
	},
	{
		profile: {
			name: 'Hihi',
			fullName: 'minhdat nguyen dinh',
			email: 'email',
			uid: 'uid',
			imageUrl: 'https://github.com/hnimtadd.png',
		},
		explore: {
			major: 'student',
			country: 'vn',
			learning: ['vietnamese', 'english'],
			interests: ['football', 'running'],
			like: 10,
		},
	},
	{
		profile: {
			name: 'Hihi',
			fullName: 'minhdat nguyen dinh',
			email: 'email',
			uid: 'uid',
			imageUrl: 'https://github.com/hnimtadd.png',
		},
		explore: {
			major: 'student',
			country: 'vn',
			learning: ['vietnamese', 'english'],
			interests: ['football', 'running'],
			like: 10,
		},
	},
	{
		profile: {
			name: 'Hihi',
			fullName: 'minhdat nguyen dinh',
			email: 'email',
			uid: 'uid',
			imageUrl: 'https://github.com/hnimtadd.png',
		},
		explore: {
			major: 'student',
			country: 'vn',
			learning: ['vietnamese', 'english'],
			interests: ['football', 'running'],
			like: 10,
		},
	},
	{
		profile: {
			name: 'Hihi',
			fullName: 'minhdat nguyen dinh',
			email: 'email',
			uid: 'uid',
			imageUrl: 'https://github.com/hnimtadd.png',
		},
		explore: {
			major: 'student',
			country: 'vn',
			learning: ['vietnamese', 'english'],
			interests: ['football', 'running'],
			like: 10,
		},
	},
	{
		profile: {
			name: 'Hihi',
			fullName: 'minhdat nguyen dinh',
			email: 'email',
			uid: 'uid',
			imageUrl: 'https://github.com/hnimtadd.png',
		},
		explore: {
			major: 'student',
			country: 'vn',
			learning: ['vietnamese', 'english'],
			interests: ['football', 'running'],
			like: 10,
		},
	},
];

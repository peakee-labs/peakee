import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import type { UserExplore, UserProfile } from '@peakee/db/types';

import ExploreProfile from './components/ExploreProfile';
import QuoteBanner from './components/quoteBanner';

export interface UserExploreData {
	profile: UserProfile;
	explore: UserExplore;
}

const ExploreScreen = () => {
	return (
		<View style={styles.container}>
			<QuoteBanner />
			<Text style={styles.h2}>Who&apos;s around the corner</Text>
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
			<TouchableOpacity style={styles.randomChatButton}>
				<Text style={styles.randomChatButtonText}>Random Chat</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ExploreScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 10,
	},
	exploreList: {
		flexDirection: 'column',
		gap: 20,
		justifyContent: 'flex-start',
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

import { StyleSheet, Text, View } from 'react-native';
import FriendsFeature from '@peakee/app/features/Friends';
import ProfileFeature from '@peakee/app/features/Profile';

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Peakee</Text>

			<ProfileFeature />

			<Text style={styles.h2}>Friends</Text>
			<View style={styles.friendsContainer}>
				<FriendsFeature />
			</View>

			<Text style={styles.h2}>Chat Rooms</Text>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
	},
	profileContainer: {
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	signOutButton: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	friendsContainer: {
		padding: 10,
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

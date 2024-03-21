import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FriendsFeature from '@peakee/app/features/Friends';
import NotificationsFeature from '@peakee/app/features/Notifications';
import ProfileFeature from '@peakee/app/features/Profile';
import { Button } from '@peakee/ui';

import { signOut } from '../utils/auth';
import { withAuth, withBottomNavigation } from '../utils/hoc';

const Home: FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Peakee</Text>
			<ProfileFeature />
			<Text style={styles.h2}>Friends</Text>
			<View style={styles.friendsContainer}>
				<FriendsFeature />
			</View>
			<Text style={styles.h2}>Chat Rooms</Text>
			<NotificationsFeature style={styles.notificationContainer} />
			<Button title="Sign out" onPress={signOut} />
		</View>
	);
};

export default withAuth(withBottomNavigation(Home));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'yellow',
	},
	notificationContainer: {
		width: 300,
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

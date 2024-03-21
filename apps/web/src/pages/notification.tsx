import { StyleSheet, Text, View } from 'react-native';
import FriendRequests from '@peakee/app/features/Notifications/FriendRequests';

import { withBottomNavigation } from '../utils/hoc';

export const Notification = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Notifications</Text>

			<View style={styles.sectionContainer}>
				<Text style={styles.subheader}>Friend requests</Text>
				<FriendRequests />
			</View>
		</View>
	);
};

export default withBottomNavigation(Notification);

const styles = StyleSheet.create({
	container: {
		padding: 14,
		paddingTop: 20,
		gap: 10,
	},
	header: {
		fontSize: 18,
		fontWeight: '500',
	},
	sectionContainer: {
		gap: 4,
	},
	subheader: {
		fontSize: 16,
	},
});

import { StyleSheet, Text } from 'react-native';
import FriendRequests from '@peakee/app/features/Notifications/FriendRequests';
import DefaultContainer from 'components/DefaultContainer';

export const NotificationsScreen = () => {
	return (
		<DefaultContainer>
			<Text style={styles.title}>Notification</Text>
			<Text style={styles.sectionTitle}>Friend requests</Text>
			<FriendRequests />
		</DefaultContainer>
	);
};

export default NotificationsScreen;

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: '500',
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: '500',
		marginBottom: 10,
	},
});

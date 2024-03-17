import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import NotificationsFeature from '@peakee/app/features/Notifications';

import HomeScreen from '../screens/Home';
import { withAuth } from '../utils/hoc';

const Home: FC = () => {
	return (
		<View style={styles.container}>
			<HomeScreen />
			<NotificationsFeature style={styles.notificationContainer} />
		</View>
	);
};

export default withAuth(Home);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	notificationContainer: {
		width: 300,
	},
});

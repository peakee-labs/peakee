import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import NotificationsFeature from '@peakee/app/features/Notifications';
import { Button } from '@peakee/ui';

import HomeScreen from '../screens/Home';
import { signOut } from '../utils/auth';
import { withAuth } from '../utils/hoc';

const Home: FC = () => {
	return (
		<View style={styles.container}>
			<HomeScreen />
			<NotificationsFeature style={styles.notificationContainer} />
			<Button title="Sign out" onPress={signOut} />
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

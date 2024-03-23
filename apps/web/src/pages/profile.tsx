import { StyleSheet, View } from 'react-native';
import ProfileFeature from '@peakee/app/features/Profile';
import { Button } from '@peakee/ui';

import { signOut } from '../utils/auth';
import { withAuth, withBottomNavigation } from '../utils/hoc';

export const Profile = () => {
	return (
		<View style={styles.container}>
			<ProfileFeature />
			<Button title="Sign out" onPress={signOut} />
		</View>
	);
};

export default withAuth(withBottomNavigation(Profile));

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 14,
		paddingTop: 20,
		gap: 10,
	},
});

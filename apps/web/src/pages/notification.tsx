import { StyleSheet, Text, View } from 'react-native';

import { withBottomNavigation } from '../utils/hoc';

export const Notification = () => {
	return (
		<View style={styles.container}>
			<Text>Notification</Text>
		</View>
	);
};

export default withBottomNavigation(Notification);

const styles = StyleSheet.create({
	container: {},
});

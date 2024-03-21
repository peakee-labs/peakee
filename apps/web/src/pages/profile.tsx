import { StyleSheet, Text, View } from 'react-native';

import { withBottomNavigation } from '../utils/hoc';

export const Profile = () => {
	return (
		<View style={styles.container}>
			<Text>profile</Text>
		</View>
	);
};

export default withBottomNavigation(Profile);

const styles = StyleSheet.create({
	container: {},
});

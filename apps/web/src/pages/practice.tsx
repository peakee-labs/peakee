import { StyleSheet, Text, View } from 'react-native';

import { withBottomNavigation } from '../utils/hoc';

export const Practice = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Practice</Text>
		</View>
	);
};

export default withBottomNavigation(Practice);

const styles = StyleSheet.create({
	container: {
		padding: 14,
		paddingTop: 20,
	},
	header: {
		fontSize: 18,
		fontWeight: '500',
	},
});

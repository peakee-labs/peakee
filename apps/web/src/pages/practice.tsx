import { StyleSheet, Text, View } from 'react-native';

import { withBottomNavigation } from '../utils/hoc';

export const Practice = () => {
	return (
		<View style={styles.container}>
			<Text>practice</Text>
		</View>
	);
};

export default withBottomNavigation(Practice);

const styles = StyleSheet.create({
	container: {},
});

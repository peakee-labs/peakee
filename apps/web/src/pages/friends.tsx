import { StyleSheet, Text, View } from 'react-native';

import { withBottomNavigation } from '../utils/hoc';

export const Friends = () => {
	return (
		<View style={styles.container}>
			<Text>friends</Text>
		</View>
	);
};

export default withBottomNavigation(Friends);

const styles = StyleSheet.create({
	container: {},
});

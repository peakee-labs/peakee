import { StyleSheet, Text, View } from 'react-native';
import { Search } from '@peakee/app/components';

import { withBottomNavigation } from '../utils/hoc';

export const Friends = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Friends</Text>
			<Search placeHolder="Type an email to search" />
			<Text style={styles.header}>Who’s around the corner</Text>
		</View>
	);
};

export default withBottomNavigation(Friends);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 14,
		paddingTop: 20,
		gap: 10,
	},
	header: {
		fontSize: 18,
		fontWeight: '500',
	},
});

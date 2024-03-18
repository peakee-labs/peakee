import { StyleSheet, View } from 'react-native';
import FriendsFeature from '@peakee/app/features/Friends';
import ProfileFeature from '@peakee/app/features/Profile';

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<ProfileFeature />
			<FriendsFeature />
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		padding: 10,
		backgroundColor: '#FFFFFF',
	},
});

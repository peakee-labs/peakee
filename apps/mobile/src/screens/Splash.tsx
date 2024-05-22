import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import 'utils/auth';

const Splash = () => {
	return (
		<View style={styles.container}>
			<Animated.View entering={FadeInUp.duration(500)}>
				<Text style={styles.title}>Peakee</Text>
			</Animated.View>
		</View>
	);
};

export default Splash;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 8,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
	},
	title: {
		fontSize: 50,
		fontWeight: '800',
		color: '#000000',
	},
	slogan: {
		fontSize: 18,
		fontWeight: '500',
		color: '#FF7701',
		marginBottom: 100,
	},
});

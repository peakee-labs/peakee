import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import 'utils/auth';

const Splash = () => {
	return (
		<View style={styles.container}>
			<Animated.Text style={styles.title} entering={FadeInUp}>
				Peakee
			</Animated.Text>
			<Animated.Text style={styles.slogan} entering={FadeInUp.delay(200)}>
				Use the language to learn
			</Animated.Text>
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

import { Image, StyleSheet, Text, View } from 'react-native';

const Splash = () => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.mascotImage}
				source={require('assets/peakee-mascot.png')}
				resizeMode="cover"
			/>

			<Text style={styles.title}>Peakee</Text>
			<Text style={styles.slogan}>Use the language to learn</Text>
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
	mascotImage: {
		width: 200,
		height: 200,
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
	},
});

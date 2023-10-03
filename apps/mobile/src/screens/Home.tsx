import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Peakee</Text>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	h1: {
		fontSize: 40,
		fontWeight: '700',
	},
});

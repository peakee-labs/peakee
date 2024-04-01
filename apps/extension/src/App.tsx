import { StyleSheet, Text, View } from 'react-native';

export const App = () => {
	return (
		<View style={styles.container}>
			<Text>Peakee Extension Development Tools</Text>
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
});

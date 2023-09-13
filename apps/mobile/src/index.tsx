import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function App(): JSX.Element {
	return (
		<View style={styles.app}>
			<ScrollView contentContainerStyle={styles.container}>
				<View>
					<Text style={styles.h1}>Peakee</Text>
				</View>
			</ScrollView>
		</View>
	);
}

export default App;

const styles = StyleSheet.create({
	app: {
		flex: 1,
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	h1: {
		fontSize: 50,
		fontWeight: '600',
	},
});

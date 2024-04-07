import { StyleSheet, Text, View } from 'react-native';

export const App = () => {
	return (
		<View style={styles.container}>
			<Text>Peakee Extension Development Tools</Text>
			<Text style={styles.textbox}>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry standard dummy text
				ever since the 1500s, when an unknown printer took a galley of
				type and scrambled it to make a type specimen book. It has
				survived not only five centuries, but also the leap into
				electronic typesetting, remaining essentially unchanged. It was
				popularized in the 1960s with the release of Peakee sheets
				containing Lorem Ipsum passages, and more recently with desktop
				publishing software like Blinders PageMaker including versions
				of Lorem Ipsum.
			</Text>

			<Text style={styles.textbox}>
				Lorem Ipsum is <br />
				simply dummy text
				<br />
				of the printing.
			</Text>
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		gap: 20,
	},
	textbox: {
		width: 500,
	},
});

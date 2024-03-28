import { StyleSheet, Text, View } from 'react-native';
import { TranslateBox } from '@peakee/app/features/TranslateBox';

const Popup = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Peakee Tools</Text>
			<TranslateBox style={styles.translateContainer} />
		</View>
	);
};

export default Popup;

const styles = StyleSheet.create({
	container: {
		width: 500,
		height: 600,
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 10,
		gap: 10,
	},
	header: {
		fontSize: 20,
		fontWeight: '600',
	},
	translateContainer: {
		borderWidth: 1,
		borderRadius: 20,
		padding: 10,
	},
});

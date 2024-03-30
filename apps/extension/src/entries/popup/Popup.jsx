import { StyleSheet, Text, View } from 'react-native';
import { TranslateBox } from '@peakee/app/features/TranslateBox';

const Popup = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Peakee Tools</Text>
			<Text style={styles.title}>Translation</Text>
			<TranslateBox style={styles.translateContainer} />
		</View>
	);
};

export default Popup;

const styles = StyleSheet.create({
	container: {
		width: 500,
		height: 400,
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 10,
		gap: 10,
	},
	header: {
		fontSize: 20,
		fontWeight: '600',
		alignSelf: 'center',
		marginTop: 4,
		marginBottom: 6,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
	},
	translateContainer: {
		borderWidth: 1,
		borderRadius: 20,
		padding: 10,
	},
});

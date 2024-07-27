import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TranslateBox } from '@peakee/features/TranslateBox';

const SidePanel: FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Translation</Text>
			<TranslateBox style={styles.translateContainer} />
		</View>
	);
};

export default SidePanel;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		// backgroundColor: '#3C3C3C',
		paddingVertical: 6,
		paddingBottom: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
		gap: 10,
	},
	title: {
		fontWeight: '500',
	},
	translateContainer: {
		borderWidth: 1.6,
		borderColor: '#DADADA',
		borderRadius: 20,
		padding: 10,
	},
});

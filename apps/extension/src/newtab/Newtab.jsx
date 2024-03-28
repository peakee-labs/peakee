import { StyleSheet, Text, View } from 'react-native';
import { TranslateBox } from '@peakee/app/features/TranslateBox';

const Newtab = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>
				Peakee Tools | Learn and use English everywhere
			</Text>

			<View style={styles.contentContainer}>
				<TranslateBox style={styles.translateContainer} />
				<View style={styles.reviewContainer}>
					<Text style={styles.reviewText}>Metonymy</Text>
					<Text style={styles.explainText}>
						the act of referring to something by the name of
						something else that is closely connected with it
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Newtab;

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	header: {
		fontSize: 18,
		fontWeight: '500',
	},
	contentContainer: {
		flexDirection: 'row',
		marginTop: 30,
	},
	translateContainer: {
		width: 500,
		borderWidth: 1,
		borderRadius: 20,
		padding: 20,
	},
	reviewContainer: {
		flex: 1,
		alignItems: 'center',
		gap: 20,
	},
	reviewText: {
		fontSize: 100,
		fontWeight: '600',
		textAlign: 'center',
	},
	explainText: {
		fontSize: 20,
		fontStyle: 'italic',
		fontWeight: '300',
		color: '#636363',
		textAlign: 'center',
	},
});

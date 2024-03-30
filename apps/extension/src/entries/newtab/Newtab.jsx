import { StyleSheet, Text, View } from 'react-native';

const Newtab = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>
				Peakee Tools | Learn and use English everywhere
			</Text>

			<View style={styles.contentContainer}>
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
		flex: 1,
		height: '100vh',
		padding: 20,
	},
	header: {
		fontSize: 18,
		fontWeight: '500',
	},
	contentContainer: {
		flex: 1,
		marginTop: 30,
	},
	reviewContainer: {
		flex: 1,
		justifyContent: 'center',
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

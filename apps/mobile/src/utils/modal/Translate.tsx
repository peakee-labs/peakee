import { StyleSheet, Text, View } from 'react-native';
import { Copy, Speaker } from '@peakee/icons';

const TranslateModal = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>English</Text>
				<View style={styles.icons}>
					<Copy size={18} color={'#000000'} strokeWidth="1.5" />
					<Speaker size={18} color={'#000000'} strokeWidth="1.5" />
				</View>
			</View>

			<Text style={styles.content}>
				What is the most popular meal in Vietnam?
			</Text>

			<View style={styles.indicator}></View>

			<View style={styles.header}>
				<Text style={styles.title}>Vietnamese</Text>
				<View style={styles.icons}>
					<Copy size={18} color={'#000000'} strokeWidth="1.5" />
					<Speaker size={18} color={'#000000'} strokeWidth="1.5" />
				</View>
			</View>

			<Text style={styles.content}>
				Món ăn nào phổ biến nhất ở Việt Nam
			</Text>
		</View>
	);
};

export default TranslateModal;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	icons: {
		flexDirection: 'row',
		gap: 8,
	},
	indicator: {
		alignSelf: 'center',
		height: 1.5,
		borderRadius: 1,
		width: 200,
		backgroundColor: '#000000',
		opacity: 0.2,
		margin: 50,
	},
	content: {
		fontSize: 30,
		marginVertical: 20,
	},
});

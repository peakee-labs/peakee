import { Image, StyleSheet, Text, View } from 'react-native';
import { QuoteRight } from '@peakee/icons';

export const Header = () => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.titleImage}
				source={require('assets/practice.png')}
			/>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>Practice Space</Text>
				<View style={styles.descriptionContainer}>
					<QuoteRight size={18} color={'#FF7701'} />
					<Text style={styles.description}>
						Learn what you need to learn
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		gap: 10,
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 20,
	},
	titleImage: {
		width: 80,
		height: 80,
	},
	contentContainer: {
		flex: 1,
		gap: 4,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
	},
	descriptionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	description: {
		lineHeight: 22,
	},
});

import { StyleSheet, Text, View } from 'react-native';
import { QuoteRight } from '@peakee/icons';

const QuoteBanner = () => {
	return (
		<View style={styles.quoteContainer}>
			<QuoteRight size={26} color={'#FF7701'} />
			<Text style={styles.quote}>
				{
					"The best way to learn English is use English. Let's play with Peakee"
				}
			</Text>
		</View>
	);
};

export default QuoteBanner;

const styles = StyleSheet.create({
	quoteContainer: {
		backgroundColor: '#FEEDCC',
		height: 'auto',
		borderRadius: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		paddingVertical: 16,
		gap: 15,
	},
	quote: {
		color: '#373636',
		flex: 1,
		flexWrap: 'wrap',
		lineHeight: 22,
	},
});

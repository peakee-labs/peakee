import { StyleSheet, Text, View } from 'react-native';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const QuoteBanner = () => {
	return (
		<View style={styles.quoteContainer}>
			<FontAwesomeIcon icon={faQuoteRight} color="#FE9E00" size={20} />
			<Text style={styles.quote}>
				The best way to learn English is using it. Let&apos; play with
				Peakee
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
		paddingRight: 50,
		paddingVertical: 20,
		gap: 15,
	},
	quote: {
		color: '#373636',
		flex: 1,
		flexWrap: 'wrap',
	},
});

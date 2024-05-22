import { StyleSheet, Text } from 'react-native';
import DefaultContainer from 'components/DefaultContainer';

export const PracticeScreen = () => {
	return (
		<DefaultContainer>
			<Text style={styles.title}>Practice Space</Text>
		</DefaultContainer>
	);
};

export default PracticeScreen;

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: '500',
	},
});

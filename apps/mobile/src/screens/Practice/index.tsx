import { StyleSheet } from 'react-native';
import DefaultContainer from 'components/DefaultContainer';

import Header from './Header';
import LatestReview from './LatestReview';

export const PracticeScreen = () => {
	return (
		<DefaultContainer style={styles.container}>
			<Header />
			<LatestReview />
		</DefaultContainer>
	);
};

export default PracticeScreen;

const styles = StyleSheet.create({
	container: {
		gap: 14,
	},
});

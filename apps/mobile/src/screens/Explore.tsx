import { StyleSheet } from 'react-native';
import ExploreFeature from '@peakee/features/Explore';
import FriendSearch from '@peakee/features/Friends/Search';
import DefaultContainer from 'components/DefaultContainer';
const ExploreScreen = () => {
	return (
		<DefaultContainer style={styles.container}>
			<FriendSearch />
			<ExploreFeature />
		</DefaultContainer>
	);
};
export default ExploreScreen;

export const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
});

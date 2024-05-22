import { StyleSheet } from 'react-native';
import ExploreFeature from '@peakee/app/features/Explore';
import FriendSearch from '@peakee/app/features/Friends/Search';
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

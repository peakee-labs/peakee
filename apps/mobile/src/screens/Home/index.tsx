import FriendsFeature from '@peakee/app/features/Friends';
import ProfileFeature from '@peakee/app/features/Profile';
import DefaultContainer from 'components/DefaultContainer';

const HomeScreen = () => {
	return (
		<DefaultContainer>
			<ProfileFeature />
			<FriendsFeature />
		</DefaultContainer>
	);
};

export default HomeScreen;

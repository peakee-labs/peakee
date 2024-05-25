import OnboardingFeature from '@peakee/app/features/Onboarding';
import { SafeAreaContainer } from '@peakee/ui';
// import SignInFeature from '@peakee/app/features/SignIn';
import { useNavigation } from '@react-navigation/native';
// import { signInWithGoogle } from 'utils/auth';

const OnboardingScreen = () => {
	const { navigate } = useNavigation();

	return (
		<SafeAreaContainer>
			<OnboardingFeature
				onDone={() => navigate('Home', { screen: 'Chat' })}
			/>
		</SafeAreaContainer>
	);
};

export default OnboardingScreen;

import { StyleSheet, View } from 'react-native';
import OnboardingFeature from '@peakee/app/features/Onboarding';
// import SignInFeature from '@peakee/app/features/SignIn';
import { useNavigation } from '@react-navigation/native';
// import { signInWithGoogle } from 'utils/auth';

const OnboardingScreen = () => {
	const { navigate } = useNavigation();

	return (
		<View style={styles.container}>
			<OnboardingFeature onDone={() => navigate('Home')} />
		</View>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

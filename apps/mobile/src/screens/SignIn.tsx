import { StyleSheet } from 'react-native';
import SignInFeature from '@peakee/app/features/SignIn';
import { useNavigation } from '@react-navigation/native';
import { signInWithGoogle } from 'utils/auth';

const SignInScreen = () => {
	const navigation = useNavigation();

	const handleSignIn = async () => {
		const userCredential = await signInWithGoogle();
		if (userCredential) {
			navigation.navigate('Home');
		}
	};

	return (
		<SignInFeature
			style={styles.container}
			titleContainerStyle={styles.titleContainer}
			buttonStyle={styles.signInButton}
			onPressSignIn={handleSignIn}
		/>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: '#FFFFFF',
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	signInButton: {},
});

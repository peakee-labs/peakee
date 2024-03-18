import { StyleSheet, View } from 'react-native';
import SignInFeature from '@peakee/app/features/SignIn';
import { useNavigation } from '@react-navigation/native';
import { signInWithGoogle } from 'utils/auth';

const SignInScreen = () => {
	const navigation = useNavigation();

	const handleSignIn = async () => {
		const userCredential = await signInWithGoogle();
		if (userCredential) {
			navigation.navigate('Home' as never);
		}
	};

	return (
		<View style={styles.container}>
			<SignInFeature onPressSignIn={handleSignIn} />
		</View>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

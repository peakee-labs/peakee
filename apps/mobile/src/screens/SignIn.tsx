import { StyleSheet, Text, View } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
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
			<Text>Sign In</Text>
			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={handleSignIn}
			/>
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

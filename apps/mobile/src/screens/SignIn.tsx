import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setProfile } from '@peakee/app/state/user';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

import { signInWithGoogle } from '../utils/auth';

const SignIn = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const handleSignIn = async () => {
		const userCredential = await signInWithGoogle();
		if (userCredential) {
			dispatch(
				setProfile({
					email: userCredential.user.email as string,
					imageUrl: userCredential.user.photoURL as string,
					name: userCredential.user.displayName as string,
					uid: userCredential.user.uid,
				}),
			);

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

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';
import { setProfile } from '@peakee/app/state';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

import { signInWithGoogle } from '../utils/auth';
import { fetchUserChatData } from '../utils/firestore';

const SignInScreen = () => {
	const userProfile = useSelector((state: RootState) => state.user.profile);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const handleSignIn = async () => {
		const userCredential = await signInWithGoogle();
		if (userCredential) {
			dispatch(
				setProfile({
					uid: userCredential.user.uid,
					name: userCredential.additionalUserInfo?.profile
						?.given_name as string,
					fullName: userCredential.user.displayName as string,
					email: userCredential.user.email as string,
					imageUrl: userCredential.user.photoURL as string,
				}),
			);

			navigation.navigate('Home' as never);
		}
	};

	useEffect(() => {
		if (userProfile) fetchUserChatData(userProfile, { listen: true });
	}, [userProfile]);

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

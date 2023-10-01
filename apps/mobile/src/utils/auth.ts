import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
	webClientId: Config.WEB_CLIENT_ID,
});

type UnknownObject = Record<string, never>;

export const signIn = async () => {
	console.debug('start sign in');
	try {
		await GoogleSignin.hasPlayServices();
		const userInfo = await GoogleSignin.signIn();

		const googleCredential = auth.GoogleAuthProvider.credential(
			userInfo.idToken,
		);

		console.log(googleCredential, '<-- google credential');

		const userCredential = await auth().signInWithCredential(
			googleCredential,
		);

		console.debug(userCredential, '<-- profile after sign in');

		return userCredential;
	} catch (error) {
		const err = error as UnknownObject;
		if (err.code === statusCodes.SIGN_IN_CANCELLED) {
			console.debug('cancelled sign in');
		} else if (err.code === statusCodes.IN_PROGRESS) {
			console.debug('sign in in progress');
		} else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			console.debug('play services not available');
		} else {
			console.debug('unknown error', err);
		}
	}
};

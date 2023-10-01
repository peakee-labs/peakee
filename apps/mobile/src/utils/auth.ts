import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

type UnknownObject = Record<string, never>;

export const signIn = async () => {
	console.debug('start sign in');
	try {
		await GoogleSignin.hasPlayServices();
		const userInfo = await GoogleSignin.signIn();
		console.debug(userInfo, '<-- profile after sign in');
		return userInfo;
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

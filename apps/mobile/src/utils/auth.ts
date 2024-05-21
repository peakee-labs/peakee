import Config from 'react-native-config';
import { resolveInitAuthPromise } from '@peakee/app';
import { getOrInitUserProfile, setJWT } from '@peakee/app/api';
import {
	resetChatState,
	resetUserState,
	setProfile,
	store,
} from '@peakee/app/state';
import type { UnknownObject } from '@peakee/app/types';
import auth from '@react-native-firebase/auth';
import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
	webClientId: Config.WEB_CLIENT_ID,
});

export const signInWithGoogle = async () => {
	try {
		await GoogleSignin.hasPlayServices();
		const userInfo = await GoogleSignin.signIn();

		const googleCredential = auth.GoogleAuthProvider.credential(
			userInfo.idToken,
		);

		const userCredential = await auth().signInWithCredential(
			googleCredential,
		);

		return userCredential;
	} catch (error) {
		const err = error as UnknownObject;
		if (err.code === statusCodes.SIGN_IN_CANCELLED) {
			console.debug('Cancelled sign in');
		} else if (err.code === statusCodes.IN_PROGRESS) {
			console.debug('Sign in in progress');
		} else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			console.debug('Play services not available');
		} else {
			console.debug('Unknown error', err);
		}
	}
};

export const signOut = async () => {
	store().dispatch(resetUserState());
	store().dispatch(resetChatState());

	await auth()
		.signOut()
		.finally(() => console.log('User signed out!'));
};

auth().onIdTokenChanged(async (authUser) => {
	if (authUser) {
		const jwt = await authUser.getIdToken();
		if (jwt) setJWT(jwt);

		const currentUserState = store().getState().user.profile;
		if (currentUserState) return;

		const user = await getOrInitUserProfile({
			name: authUser.displayName as string,
			email: authUser.email as string,
			imageUrl: authUser.photoURL as string,
		});

		if (user) {
			store().dispatch(setProfile(user));
		}

		resolveInitAuthPromise(user);
	} else {
		resolveInitAuthPromise(undefined);
	}
});

import { getOrInitUserProfile, setJWT } from '@peakee/api';
import {
	resetChatState,
	resetUserState,
	setProfile,
	store,
} from '@peakee/state';
import type { UnknownObject } from '@peakee/types';
import auth from '@react-native-firebase/auth';
import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';

import { handleIdTokenChange } from './common';

export * from './common';

export const signInWithGoogle = async () => {
	try {
		await GoogleSignin.hasPlayServices();
		const userInfo = await GoogleSignin.signIn();

		const googleCredential = auth.GoogleAuthProvider.credential(
			userInfo.idToken,
		);

		const credential = await auth().signInWithCredential(googleCredential);
		setJWT(await credential.user.getIdToken());

		const user = await getOrInitUserProfile({
			name: credential.user.displayName as string,
			email: credential.user.email as string,
			imageUrl: credential.user.photoURL as string,
		});

		if (user) {
			store().dispatch(setProfile(user));
		}

		return user;
	} catch (error) {
		const err = error as UnknownObject;
		if (err.code === statusCodes.SIGN_IN_CANCELLED) {
			console.debug('Cancelled sign in');
		} else if (err.code === statusCodes.IN_PROGRESS) {
			console.debug('Sign in in progress');
		} else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			console.debug('Play services not available');
		} else {
			console.debug('Unknown error', JSON.stringify(err));
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

auth().onIdTokenChanged(handleIdTokenChange);

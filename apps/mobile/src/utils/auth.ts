import Config from 'react-native-config';
import {
	resetChatState,
	resetUserState,
	setProfile,
	store,
} from '@peakee/app/state';
import { initUserChatData } from '@peakee/app/utils';
import auth from '@react-native-firebase/auth';
import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';

import { listenUserChatData } from './firestore';

GoogleSignin.configure({
	webClientId: Config.WEB_CLIENT_ID,
});

type UnknownObject = Record<string, never>;

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
	await auth()
		.signOut()
		.then(() => console.log('User signed out!'));
};

let authEmailCache: string;

auth().onAuthStateChanged((user) => {
	if (!user) {
		authEmailCache = '';
		store.dispatch(resetUserState());
		store.dispatch(resetChatState());
	} else if (user.email !== authEmailCache) {
		authEmailCache = user.email as string;
		const userProfile: UserProfile = {
			uid: user.uid,
			name: user.displayName as string,
			fullName: user.displayName as string,
			email: user.email as string,
			imageUrl: user.photoURL as string,
		};
		store.dispatch(setProfile(userProfile));

		initUserChatData(userProfile).then((user) => {
			listenUserChatData(user.id);
		});
	}
});

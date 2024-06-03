import {
	getAuth,
	GoogleAuthProvider,
	signInWithCredential,
} from '@firebase/auth/web-extension';
import { initWebsocketWithProfile, resolveInitAuthPromise } from '@peakee/app';
import { getOrInitUserProfile, setJWT } from '@peakee/app/api';
import { resetUserState, setProfile, store } from '@peakee/app/state';
import { initializeApp } from 'firebase/app';

import { logger } from './logger';

const firebaseConfig = {
	appId: APP_ID,
	apiKey: API_KEY,
	projectId: PROJECT_ID,
	authDomain: AUTH_DOMAIN,
	storageBucket: STORAGE_BUCKET,
	measurementId: MEASUREMENT_ID,
	messagingSenderId: MESSAGING_SENDER_ID,
};

initializeApp(firebaseConfig);
export const auth = getAuth();

export const signIn = async () => {
	const responseUrl = await chrome.identity.launchWebAuthFlow({
		interactive: true,
		url: getGoogleAuthURL(),
	});
	const queryString = responseUrl?.split('#')?.[1];
	const searchParams = new URLSearchParams(queryString);
	const token = searchParams.get('access_token');
	const credential = GoogleAuthProvider.credential(null, token);
	await signInWithCredential(auth, credential);
};

const getGoogleAuthURL = () => {
	const redirectURL = chrome.identity.getRedirectURL();
	const scopes = ['openid', 'email', 'profile'];
	let authURL = 'https://accounts.google.com/o/oauth2/auth';
	authURL += `?client_id=${WEB_OAUTH_CLIENT_ID}`;
	authURL += `&response_type=token`;
	authURL += `&redirect_uri=${encodeURIComponent(redirectURL)}`;
	authURL += `&scope=${encodeURIComponent(scopes.join(' '))}`;

	return authURL;
};

export const signOut = async () => {
	await auth.signOut();
	store().dispatch(resetUserState());
};

auth.onIdTokenChanged(async (firebaseUser) => {
	if (firebaseUser) {
		const jwt = await firebaseUser.getIdToken();
		setJWT(jwt);
		initWebsocketWithProfile(firebaseUser.uid, jwt);

		const user = await getOrInitUserProfile({
			name: firebaseUser.displayName as string,
			email: firebaseUser.email as string,
			imageUrl: firebaseUser.photoURL as string,
		});
		resolveInitAuthPromise(user);

		if (user) store().dispatch(setProfile(user));
	} else {
		resolveInitAuthPromise(undefined);
	}

	logger.log('auth updated');
});

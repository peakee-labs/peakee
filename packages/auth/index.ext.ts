import {
	getAuth,
	GoogleAuthProvider,
	signInWithCredential,
} from '@firebase/auth/web-extension';
import { resetUserState, store } from '@peakee/state';
import { initializeApp } from 'firebase/app';

import { handleIdTokenChange } from './common';

export * from './common';

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

export const signInWithGoogle = async () => {
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

auth.onIdTokenChanged(handleIdTokenChange);

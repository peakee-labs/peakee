import {
	getAuth,
	GoogleAuthProvider,
	signInWithCredential,
} from '@firebase/auth/web-extension';
import { initWebsocketWithProfile } from '@peakee/app';
import { getOrInitUserProfile, setJWT } from '@peakee/app/api';
import {
	resetUserState,
	setProfile,
	setProfileLoading,
	store,
} from '@peakee/app/state';
import { initializeApp } from 'firebase/app';

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
	const token = await launchSignIn();
	return signInWithToken(token);
};

export const signInWithToken = async (token: string) => {
	const credential = GoogleAuthProvider.credential(null, token);
	const { user } = await signInWithCredential(auth, credential);

	return user;
};

export const launchSignIn = async () => {
	const responseUrl = await chrome.identity.launchWebAuthFlow({
		interactive: true,
		url: getGoogleAuthURL(),
	});
	const queryString = responseUrl?.split('#')?.[1];
	const searchParams = new URLSearchParams(queryString);
	const token = searchParams.get('access_token');

	return token as string;
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

		if (user) store().dispatch(setProfile(user));
	} else {
		setJWT('');
	}

	store().dispatch(setProfileLoading(false));
});

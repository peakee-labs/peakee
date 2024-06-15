import { resetUserState, store } from '@peakee/state';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const signInWithGoogle = async () => {
	await signInWithPopup(auth, provider);
};

export const signOut = async () => {
	await auth.signOut();
	store().dispatch(resetUserState());
};

auth.onIdTokenChanged(handleIdTokenChange);

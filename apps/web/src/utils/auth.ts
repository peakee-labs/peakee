import { setProfile, store } from '@peakee/app/state';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
	appId: APP_ID,
	apiKey: API_KEY,
	projectId: PROJECT_ID,
	authDomain: AUTH_DOMAIN,
	storageBucket: STORAGE_BUCKET,
	measurementId: MEASUREMENT_ID,
	messagingSenderId: MESSAGING_SENDER_ID,
};

export const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const signIn = async () => {
	try {
		const userCredential = await signInWithPopup(auth, provider);
		const user = userCredential.user;
		store.dispatch(
			setProfile({
				uid: user.uid,
				name: user.displayName as string,
				fullName: user.displayName as string,
				email: user.email as string,
				imageUrl: user.photoURL as string,
			}),
		);
	} catch (e) {
		console.log('Sign in error', e);
	}
};

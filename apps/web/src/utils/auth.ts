import { initWebsocketWithProfile } from '@peakee/app';
import { resetUserState, setProfile, store } from '@peakee/app/state';
import type { AxiosError } from 'axios';
import { isAxiosError } from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { axios } from './axios';

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

type UserProfile = {
	id: string;
	email: string;
	name: string;
	imageUrl: string;
	friends: string[];
	createdAt: string;
	updatedAt: string;
};

export const signIn = async () => {
	const userCredential = await signInWithPopup(auth, provider);
	const firebaseUser = userCredential.user;
	const jwt = await firebaseUser.getIdToken();

	let user: UserProfile | null = null;
	try {
		const res = await axios.get<UserProfile>('/users/self', {
			headers: { Authorization: 'Bearer ' + jwt },
		});
		user = res.data;
	} catch (error) {
		const isUserNotInitialized =
			isAxiosError(error) &&
			(error as AxiosError).response?.status == 404;

		if (isUserNotInitialized) {
			const newUserProfile = {
				name: firebaseUser.displayName,
				email: firebaseUser.email,
				imageUrl: firebaseUser.photoURL,
			};
			const res = await axios.post<UserProfile>(
				'/users/self',
				newUserProfile,
				{
					headers: { Authorization: 'Bearer ' + jwt },
				},
			);

			user = res.data;
		}
	}

	if (user) store.dispatch(setProfile(user));
};

export const signOut = async () => {
	await auth.signOut();
	store.dispatch(resetUserState());
};

auth.onAuthStateChanged(async (firebaseUser) => {
	if (firebaseUser) {
		initWebsocketWithProfile(
			PEAKEE_WS_URL,
			firebaseUser.uid,
			await firebaseUser.getIdToken(),
		);
	}
});

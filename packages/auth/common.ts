import { getOrInitUserProfile } from '@peakee/api';
import { initWebsocketWithProfile } from '@peakee/api/websocket';
import { logger } from '@peakee/logger';
import { setProfile, store } from '@peakee/state';
import type { UserProfile } from '@peakee/types';
/**
 * only import type for this common module which is reused cross-platform
 */
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { User } from 'firebase/auth';

export const handleIdTokenChange = async (
	firebaseUser: FirebaseAuthTypes.User | User | null,
) => {
	if (firebaseUser) {
		const jwt = await firebaseUser.getIdToken();
		initWebsocketWithProfile(firebaseUser.uid, jwt);

		const user = await getOrInitUserProfile({
			name: firebaseUser.displayName || unknownUser.name,
			email: firebaseUser.email || unknownUser.email,
			imageUrl: firebaseUser.photoURL || unknownUser.imageUrl,
		});

		resolveInitAuthPromise(user);

		if (user) store().dispatch(setProfile(user));
	} else {
		resolveInitAuthPromise(undefined);
	}

	logger().log('auth updated');
};

/**
 * To check if the auth initialization is resolved or not
 */
export let initAuthResolved = false;

/**
 * Call this resolve function in auth init after getting user profile
 */
export let resolveInitAuthPromise: (user: UserProfile | undefined) => void;

/**
 * This promise is resolved by auth init
 */
export const initAuthPromise = new Promise<UserProfile | undefined>(
	(resolve) => {
		resolveInitAuthPromise = (user) => {
			resolve(user);
			initAuthResolved = true;
		};
	},
);

export const unknownUser = {
	name: 'Unknown',
	email: 'unknown@peakee.co',
	imageUrl: '',
};

import { getOrInitUserProfile } from '@peakee/api';
import { initWebsocketWithProfile } from '@peakee/api/websocket';
import { logger } from '@peakee/logger';
import { setProfile, store } from '@peakee/state';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { User } from 'firebase/auth';

/**
 * This promise is resolved by auth init
 */
export const initAuthPromise = new Promise<void>((resolve) => {
	resolveInitAuthPromise = resolve;
});

/**
 * Call this resolve function in auth init after getting user profile
 */
let resolveInitAuthPromise: () => void;

/**
 * Note: for better init time with initAuthPromise, resolve only jwt, not fetching user from API
 */
export const handleIdTokenChange = async (
	firebaseUser: FirebaseAuthTypes.User | User | null,
) => {
	if (firebaseUser) {
		resolveInitAuthPromise();
		initRemoteProfile(firebaseUser);
	} else {
		resolveInitAuthPromise();
	}

	logger().log('Auth updated');
};

const initRemoteProfile = async (
	firebaseUser: FirebaseAuthTypes.User | User,
) => {
	const jwt = await firebaseUser.getIdToken();
	initWebsocketWithProfile(firebaseUser.uid, jwt);

	const user = await getOrInitUserProfile({
		name: firebaseUser.displayName || unknownUser.name,
		email: firebaseUser.email || unknownUser.email,
		imageUrl: firebaseUser.photoURL || unknownUser.imageUrl,
	});

	if (user) store().dispatch(setProfile(user));
};

export const unknownUser = {
	name: 'Unknown',
	email: 'unknown@peakee.co',
	imageUrl: '',
};

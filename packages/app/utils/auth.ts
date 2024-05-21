import type { UserProfile } from '../types';

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

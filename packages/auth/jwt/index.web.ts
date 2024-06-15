/**
 * treat as independence module to prevent circle dependencies
 */

import { getAuth } from 'firebase/auth';

export const getJWT = () => {
	const auth = getAuth();
	return auth.currentUser?.getIdToken();
};

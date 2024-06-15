/**
 * treat as independence module to prevent circle dependencies
 */

import auth from '@react-native-firebase/auth';

export const getJWT = () => {
	return auth().currentUser?.getIdToken();
};

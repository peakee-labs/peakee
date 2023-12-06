import auth from '@react-native-firebase/auth';
export const handleGetIdToken = () => {
	return auth().currentUser?.getIdToken();
};

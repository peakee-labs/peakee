import type { UserProfile } from '@peakee/app/types';
import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');

export const fetchUserData = async (profile: UserProfile) => {
	try {
		const userDoc = await firestore()
			.collection('Users')
			.where('firebaseUid', '==', profile.uid)
			.get();

		if (userDoc.docs.length == 0) {
			console.log('not found this user');
		}

		console.log(userDoc, '<-- users');
	} catch (e) {
		console.log(e, '<-- firestore error');
	}
};

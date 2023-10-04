import type { UserChatData, UserProfile } from '@peakee/app/types';
import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');

export const fetchUserData = async (profile: UserProfile) => {
	try {
		const userDocs = await usersCollection
			.where('firebaseUid', '==', profile.uid)
			.get();

		if (userDocs.docs.length == 0) {
			console.log('Not found this user', profile.email);
			console.log('-> Init user to firestore');
			const userDoc: UserChatData = {
				name: profile.name,
				email: profile.email,
				firebaseUid: profile.uid,
				friends: [],
			};

			await usersCollection.add(userDoc);
		} else if (userDocs.docs.length == 1) {
			console.log('Found in firestore');
		} else {
			console.log('Found duplication', userDocs.docs.length);
		}
	} catch (e) {
		console.log(e, '<-- Firestore error');
	}
};

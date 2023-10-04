import { setChatData, store } from '@peakee/app/state';
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

			const userDoc: Partial<UserChatData> = {
				name: profile.name,
				email: profile.email,
				firebaseUid: profile.uid,
				friends: [],
			};

			const res = await usersCollection.add(userDoc);
			userDoc.id = res.id;
			store.dispatch(setChatData(userDoc as UserChatData));
		} else if (userDocs.docs.length == 1) {
			console.log('Found in firestore');

			const chatData = {
				id: userDocs.docs[0].id,
				...userDocs.docs[0].data(),
			} as UserChatData;

			store.dispatch(setChatData(chatData));
		} else {
			console.log('Found duplication', userDocs.docs.length);
		}
	} catch (e) {
		console.log(e, '<-- Firestore error');
	}
};

export const addFriend = async (email: string) => {
	const friendsQuery = await usersCollection
		.where('email', '==', email)
		.get();

	if (friendsQuery.docs.length === 0) {
		console.log('Not found this user');
	} else {
		const data = store.getState().user.chatData;
		if (!data) {
			console.log('Not found user chat data');
			return false;
		}

		const friendId = friendsQuery.docs[0].id;
		if (!data.friends.includes(friendId)) {
			console.log('Already added');
			return false;
		}

		await usersCollection.doc(data.id).update({
			friends: [...data.friends, friendId],
		});

		return true;
	}

	return false;
};

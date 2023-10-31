import type {
	CreateNewChatRoomFunction,
	CreateNewMessageFunction,
	CreateNewUserFunction,
	GetChatRoomsFunction,
	GetUserByEmailFunction,
	GetUserByFirebaseUIDFunction,
	GetUserByIDFunction,
	GetUsersFunction,
	UpdateFriendFunction,
} from '@peakee/db';
import { injectFirestoreFunctions } from '@peakee/db';
import type { ChatRoom, UserChatData } from '@peakee/db/types';
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	documentId,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';

import {
	chatRoomsCollection,
	listenMessagesInChatRoom,
	usersCollection,
} from '../firestore';

export const injectFirestoreDB = () => {
	injectFirestoreFunctions({
		createNewUser: createNewUserImpl,
		getUserByID: getUserByIDImpl,
		getUserByFirebaseUID: getUserByFirebaseUIDImpl,
		getUserByEmail: getUserByEmailImpl,
		getUsers: getUsersImpl,
		updateFriend: updateFriendImpl,
		createNewChatRoom: createNewChatRoomImpl,
		getChatRooms: getChatRoomsImpl,
		createNewMessage: createNewMessageImpl,
		listenMessagesOfChatRoom: listenMessagesInChatRoom,
	});
};

const createNewUserImpl: CreateNewUserFunction = async (user) => {
	const { id } = await addDoc(usersCollection, user);
	return { id, ...user };
};

const getUserByIDImpl: GetUserByIDFunction = async (id) => {
	const userDoc = doc(usersCollection, id);
	const usersQuery = await getDoc(userDoc);
	if (usersQuery.exists())
		return {
			id: usersQuery.id,
			...usersQuery.data(),
		} as UserChatData;
};

const getUserByFirebaseUIDImpl: GetUserByFirebaseUIDFunction = async (uid) => {
	const usersQuery = query(usersCollection, where('firebaseUid', '==', uid));
	const userDocs = await getDocs(usersQuery);
	if (userDocs.docs.length === 0) return;

	return userDocs.docs[0] as unknown as UserChatData;
};

const getUserByEmailImpl: GetUserByEmailFunction = async (email) => {
	const usersQuery = query(usersCollection, where('email', '==', email));
	const userDocs = await getDocs(usersQuery);
	if (userDocs.docs.length === 0) return;

	return userDocs.docs[0] as unknown as UserChatData;
};

const getUsersImpl: GetUsersFunction = async (ids) => {
	if (ids.length === 0) return [];
	const usersQuery = query(usersCollection, where(documentId(), 'in', ids));
	const userDocs = await getDocs(usersQuery);
	return userDocs.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		} as unknown as UserChatData;
	});
};

const updateFriendImpl: UpdateFriendFunction = async (user, friend) => {
	const userDoc = doc(usersCollection, user.id);
	const friendDoc = doc(usersCollection, friend.id);
	await Promise.all([
		updateDoc(userDoc, {
			friends: arrayUnion(friend.id),
		}),
		updateDoc(friendDoc, {
			friends: arrayUnion(user.id),
		}),
	]);
};

const createNewChatRoomImpl: CreateNewChatRoomFunction = async (room) => {
	const { id: roomID } = await addDoc(chatRoomsCollection, room);

	const promises = room.members.map((userID) => {
		const userDoc = doc(usersCollection, userID);
		return updateDoc(userDoc, {
			chatRooms: arrayUnion(roomID),
		});
	});

	await Promise.all(promises);

	return { id: roomID, ...room };
};

const getChatRoomsImpl: GetChatRoomsFunction = async (ids: string[]) => {
	if (ids.length === 0) return [];
	const chatRoomsQuery = query(
		chatRoomsCollection,
		where(documentId(), 'in', ids),
	);
	const chatRoomDocs = await getDocs(chatRoomsQuery);

	return chatRoomDocs.docs.map((ele) => {
		return { id: ele.id, ...ele.data() } as ChatRoom;
	});
};

const createNewMessageImpl: CreateNewMessageFunction = async (message) => {
	const messageDoc = collection(
		chatRoomsCollection,
		message.roomId,
		'Messages',
	);
	const res = await addDoc(messageDoc, message);

	return { id: res.id, ...message };
};

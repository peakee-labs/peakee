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
import type { ChatRoom, Message, UserChatData } from '@peakee/db/types';
import firestore from '@react-native-firebase/firestore';

import { chatRoomsCollection, usersCollection } from '../firestore';

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
	});
};

const createNewUserImpl: CreateNewUserFunction = async (user) => {
	const { id } = await usersCollection.add(user);
	return { id, ...user };
};

const getUserByIDImpl: GetUserByIDFunction = async (id) => {
	const usersQuery = await usersCollection.doc(id).get();
	if (usersQuery.exists)
		return {
			id: usersQuery.id,
			...usersQuery.data(),
		} as UserChatData;
};

const getUserByFirebaseUIDImpl: GetUserByFirebaseUIDFunction = async (uid) => {
	const usersQuery = await usersCollection
		.where('firebaseUid', '==', uid)
		.get();
	if (usersQuery.docs.length === 0) return;

	return usersQuery.docs[0] as unknown as UserChatData;
};

const getUserByEmailImpl: GetUserByEmailFunction = async (email) => {
	const usersQuery = await usersCollection.where('email', '==', email).get();
	if (usersQuery.docs.length === 0) return;

	return usersQuery.docs[0] as unknown as UserChatData;
};

const getUsersImpl: GetUsersFunction = async (ids) => {
	if (ids.length === 0) return [];
	const usersQuery = await usersCollection
		.where(firestore.FieldPath.documentId(), 'in', ids)
		.get();

	return usersQuery.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		} as unknown as UserChatData;
	});
};

const updateFriendImpl: UpdateFriendFunction = async (user, friend) => {
	await Promise.all([
		usersCollection.doc(user.id).update({
			friends: firestore.FieldValue.arrayUnion(friend.id),
		}),

		usersCollection.doc(friend.id).update({
			friends: firestore.FieldValue.arrayUnion(user.id),
		}),
	]);
};

const createNewChatRoomImpl: CreateNewChatRoomFunction = async (room) => {
	const { id: roomID } = await chatRoomsCollection.add(room);

	const promises = room.members.map((userID) => {
		return usersCollection.doc(userID).update({
			chatRooms: firestore.FieldValue.arrayUnion(roomID),
		});
	});

	await Promise.all(promises);

	return { id: roomID, ...room };
};

const getChatRoomsImpl: GetChatRoomsFunction = async (ids: string[]) => {
	if (ids.length === 0) return [];
	const chatRoomsQuery = await chatRoomsCollection
		.where(firestore.FieldPath.documentId(), 'in', ids)
		.get();

	const chatRoomsPromises = chatRoomsQuery.docs.map(async (ele) => {
		const latestMessages = await ele.ref
			.collection('Messages')
			.orderBy('time', 'desc')
			.limit(1)
			.get();
		let latestMessage: Message | undefined = undefined;
		if (latestMessages.docs.length > 0) {
			latestMessage = {
				id: latestMessages.docs[0].id,
				...latestMessages.docs[0].data(),
				time: latestMessages.docs[0].data().time.toDate().toString(),
			} as Message;
		}

		return {
			id: ele.id,
			...ele.data(),
			latestMessage,
		} as ChatRoom;
	});

	return Promise.all(chatRoomsPromises);
};

const createNewMessageImpl: CreateNewMessageFunction = async (message) => {
	const res = await chatRoomsCollection
		.doc(message.roomId)
		.collection('Messages')
		.add(message);

	return { id: res.id, ...message };
};

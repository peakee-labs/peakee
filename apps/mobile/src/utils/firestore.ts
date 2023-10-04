import type { ChatState } from '@peakee/app/state';
import {
	setChatData,
	setChatRooms,
	setFriends,
	setMessages,
	store,
} from '@peakee/app/state';
import type {
	ChatRoom,
	Message,
	UserChatData,
	UserProfile,
} from '@peakee/app/types';
import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');
export const chatRoomsCollection = firestore().collection('ChatRooms');

export const fetchUserChatData = async (
	profile: UserProfile,
	option?: { listen: boolean },
) => {
	try {
		const usersQuery = await usersCollection
			.where('firebaseUid', '==', profile.uid)
			.get();

		let userChatDataId: string;

		if (usersQuery.docs.length == 0) {
			console.log('Not found this user -> init', profile.email);
			const userDoc: Partial<UserChatData> = {
				name: profile.name,
				fullName: profile.fullName,
				email: profile.email,
				imageUrl: profile.imageUrl,
				firebaseUid: profile.uid,
				friends: [],
				chatRooms: [],
			};

			const res = await usersCollection.add(userDoc);
			userChatDataId = res.id;
		} else {
			console.log('Found in firestore', profile.email);
			userChatDataId = usersQuery.docs[0].id;
		}

		if (option?.listen) {
			listenUserChatData(userChatDataId);
		}
	} catch (e) {
		console.log(e, '<-- Firestore error');
	}
};

export const listenUserChatData = (id: string) => {
	usersCollection.doc(id).onSnapshot(async (doc) => {
		console.log('User Chat on event');
		const friendsIds = doc.data()?.friends as string[];
		const roomsIds = doc.data()?.chatRooms as string[];

		const localChatData = store.getState().user.chatData;
		// Need to optimize if any profiles are already fetched
		if (
			friendsIds.toString() !== (localChatData?.friends || []).toString()
		) {
			fetchFriends(friendsIds);
		}

		if (
			roomsIds.toString() !== (localChatData?.chatRooms || []).toString()
		) {
			fetchRooms(roomsIds);
		}

		store.dispatch(
			setChatData({
				id,
				...doc.data(),
			} as UserChatData),
		);
	});
};

export const fetchFriends = async (friendsIds: string[]) => {
	if (friendsIds.length === 0) return;
	const friendsQuery = await usersCollection
		.where(firestore.FieldPath.documentId(), 'in', friendsIds)
		.get();

	store.dispatch(
		setFriends(
			friendsQuery.docs.map((ele) => {
				return {
					id: ele.id,
					...ele.data(),
				} as UserChatData;
			}),
		),
	);
};

export const fetchRooms = async (roomsIds: string[]) => {
	if (roomsIds.length === 0) return;
	const chatRoomsQuery = await chatRoomsCollection
		.where(firestore.FieldPath.documentId(), 'in', roomsIds)
		.get();

	store.dispatch(
		setChatRooms(
			chatRoomsQuery.docs.map((ele) => {
				return {
					id: ele.id,
					...ele.data(),
				} as ChatRoom;
			}),
		),
	);
};

export const fetchMessages = async (roomId: string) => {
	const messagesQuery = await chatRoomsCollection
		.where(firestore.FieldPath.documentId(), '==', roomId)
		.get();

	const messages = messagesQuery.docs.map((ele) => {
		return {
			id: ele.id,
			...ele.data(),
		} as Message;
	});

	store.dispatch(
		setMessages({
			info: store
				.getState()
				.user.chatRooms?.find((ele) => ele.id === roomId),
			messages,
		} as ChatState),
	);
};

export const addFriend = async (email: string) => {
	if (!email) return false;

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
		if (data.friends.includes(friendId)) {
			console.log('Already added');
			return false;
		}

		await usersCollection.doc(data.id).update({
			friends: [...data.friends, friendId],
		});

		await usersCollection.doc(friendId).update({
			friends: [...friendsQuery.docs[0].data().friends, data.id],
		});

		console.log('Added', email);

		return true;
	}

	return false;
};

export const createNewChatRoom = async (options: {
	type: 'group' | 'individual';
	members: string[];
	name?: string;
	imageUrl?: string;
}) => {
	const room: Partial<ChatRoom> = {
		type: options.type,
		members: options.members,
	};

	if (options.type === 'group') {
		console.log('create group chat');
	} else if (options.type === 'individual') {
		console.log('create individual chat');
	}

	const res = await chatRoomsCollection.add(room);
	const userChatData = store.getState().user.chatData;
	await usersCollection.doc(userChatData?.id).update({
		chatRooms: [...(userChatData?.chatRooms || []), res.id],
	});

	room.id = res.id;

	return room as ChatRoom;
};

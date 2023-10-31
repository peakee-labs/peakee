import type { ChatState } from '@peakee/app/state';
import { setLatestMessageOfChatRoom } from '@peakee/app/state';
import {
	addMessages,
	setChatData,
	setChatRooms,
	setFriends,
	setMessages,
	store,
} from '@peakee/app/state';
import {
	createNewUser,
	getChatRooms,
	getUserByEmail,
	getUserByFirebaseUID,
	getUsers,
	updateFriend,
} from '@peakee/db';
import type { Message, UserChatData, UserProfile } from '@peakee/db/types';

export const initUserChatData = async (profile: UserProfile) => {
	let user = await getUserByFirebaseUID(profile.uid);
	if (!user) {
		console.log('Not found this user -> init', profile.email);
		user = await createNewUser({
			name: profile.name,
			fullName: profile.fullName,
			email: profile.email,
			imageUrl: profile.imageUrl,
			firebaseUid: profile.uid,
			friends: [],
			chatRooms: [],
		});
	} else {
		console.log('Found in firestore', profile.email);
	}

	return user;
};

export const addFriend = async (email: string) => {
	const user = store.getState().user.chatData;
	if (!user) throw Error('Not found user chat data');
	else if (user.friends.includes(email)) {
		console.log('Friend already added', email);
		return false;
	}

	const friend = await getUserByEmail(email);
	if (!friend) {
		console.log('Friend not found', email);
		return false;
	} else {
		await updateFriend(user, friend);
		return true;
	}
};

export const handleChangeUser = async (user: UserChatData) => {
	const currentUser = store.getState().user.chatData;

	if (user.friends.toString() !== (currentUser?.friends || []).toString()) {
		const friends = await getUsers(user.friends);
		store.dispatch(setFriends(friends));
	}

	if (
		user.chatRooms.toString() !== (currentUser?.chatRooms || []).toString()
	) {
		const chatRooms = await getChatRooms(user.chatRooms);
		store.dispatch(setChatRooms(chatRooms));
	}

	store.dispatch(setChatData(user));
};

export const handleIncomingMessages = (roomId: string, messages: Message[]) => {
	const room = store.getState().chat[roomId];
	if (room) {
		const lastMessageId = room.messages[room.messages.length - 1].id;
		const lastMessageIdx = messages.findIndex(
			(ele) => ele.id === lastMessageId,
		);
		const incomingMessages = messages.slice(lastMessageIdx + 1);
		store.dispatch(
			setLatestMessageOfChatRoom(messages[messages.length - 1]),
		);
		store.dispatch(
			addMessages({
				roomId,
				messages: incomingMessages,
			}),
		);
	} else {
		const info = store
			.getState()
			.user.chatRooms?.find((ele) => ele.id === roomId);

		store.dispatch(setMessages({ info, messages } as ChatState));
	}
};

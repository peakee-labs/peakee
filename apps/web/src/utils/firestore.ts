import { handleChangeUser, handleIncomingMessages } from '@peakee/app/utils';
import type { Message, UserChatData } from '@peakee/db/types';
import {
	collection,
	doc,
	getFirestore,
	limitToLast,
	onSnapshot,
	orderBy,
	query,
} from 'firebase/firestore';

import { app } from './auth';

const db = getFirestore(app);
export const chatRoomsCollection = collection(db, 'ChatRooms');
export const usersCollection = collection(db, 'Users');

export const listenUserChatData = (id: string) => {
	const userDoc = doc(usersCollection, id);
	onSnapshot(userDoc, async (doc) => {
		const user = { id, ...doc.data() } as UserChatData;

		handleChangeUser(user);
	});
};

export const listenMessagesInChatRoom = async (roomId: string) => {
	const messagesCollection = collection(
		chatRoomsCollection,
		roomId,
		'Messages',
	);
	const messageQuery = query(
		messagesCollection,
		orderBy('time'),
		limitToLast(10),
	);

	onSnapshot(messageQuery, ({ docs }) => {
		const messages = docs.map((ele) => {
			const data = ele.data();
			data.time = data.time.toString();
			return {
				id: ele.id,
				...data,
			} as Message;
		});

		handleIncomingMessages(roomId, messages);
	});
};

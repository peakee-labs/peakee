import { handleChangeUser, handleIncomingMessages } from '@peakee/app/utils';
import type { Message, UserChatData } from '@peakee/db/types';
import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');
export const chatRoomsCollection = firestore().collection('ChatRooms');

export const listenUserChatData = (id: string) => {
	usersCollection.doc(id).onSnapshot(async (doc) => {
		const user = { id, ...doc.data() } as UserChatData;

		handleChangeUser(user);
	});
};

export const listenMessagesInChatRoom = async (roomId: string) => {
	chatRoomsCollection
		.doc(roomId)
		.collection('Messages')
		.orderBy('time')
		.limitToLast(10)
		.onSnapshot(({ docs }) => {
			const messages = docs.map((ele) => {
				const data = ele.data();
				data.time = data.time.toDate().toString();
				return {
					id: ele.id,
					...data,
				} as Message;
			});

			handleIncomingMessages(roomId, messages);
		});
};

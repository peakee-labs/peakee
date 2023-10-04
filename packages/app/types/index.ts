export interface UserProfile {
	name: string;
	email: string;
	uid: string;
	imageUrl: string;
}

export interface UserChatData {
	name: string;
	email: string;
	firebaseUid: string;
	friends: Array<string>;
}

export interface ChatRoom {
	id: string;
	name: string;
	imageUrl: string;
	type: 'group' | 'individual';
}

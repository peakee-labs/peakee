export interface UserProfile {
	name: string;
	fullName: string;
	email: string;
	uid: string;
	imageUrl: string;
}

export interface UserChatData {
	id: string;
	name: string;
	fullName: string;
	email: string;
	imageUrl: string;
	firebaseUid: string;
	friends: Array<string>;
}

export interface ChatRoom {
	id: string;
	name: string;
	imageUrl: string;
	type: 'group' | 'individual';
}

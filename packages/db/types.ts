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
	friends: string[];
	chatRooms: string[];
}

export interface ChatRoom {
	id: string;
	type: 'group' | 'individual';
	members: string[];
	name?: string;
	imageUrl?: string;
	latestMessage?: Message;
}

export interface Message {
	id: string;
	content: string;
	senderId: string;
	roomId: string;
	time: Date | string;
	sent?: boolean;
}

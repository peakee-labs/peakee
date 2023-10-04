export interface UserProfile {
	name: string;
	email: string;
	uid: string;
	imageUrl: string;
}

export interface ChatRoom {
	id: string;
	name: string;
	imageUrl: string;
	type: 'group' | 'individual';
}

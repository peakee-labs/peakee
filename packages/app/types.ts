export interface UserProfile {
	id: string;
	name: string;
	email: string;
	imageURL: string;
	createdAt: string;
	updatedAt: string;
	friends: string[];
}

export interface PublicUserProfile {
	id: string;
	name: string;
	email: string;
	imageURL: string;
}

export interface FriendRequest {
	id: string;
	from: string;
	to: string;
	status: 'pending' | 'accepted' | 'denied';
	createdAt: string;
	updatedAt: string;
	user?: PublicUserProfile;
}

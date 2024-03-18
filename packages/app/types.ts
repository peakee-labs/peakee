export type UserProfile = {
	id: string;
	name: string;
	email: string;
	imageURL: string;
	createdAt: string;
	updatedAt: string;
	friends: string[];
};

export type PublicUserProfile = {
	id: string;
	name: string;
	email: string;
	imageURL: string;
};

export type FriendRequest = {
	id: string;
	from: string;
	to: string;
	status: 'pending' | 'accepted' | 'denied';
	createdAt: string;
	updatedAt: string;
	user?: PublicUserProfile;
};

export type Conversation = {
	id: string;
	type: 'individual' | 'group';
	members: [
		{
			userId: string;
			createdAt: string;
			updatedAt: string;
			joinAt: string;
		},
	];
	createdBy: string;
	createdAt: string;
	updatedAt: string;
	messages?: Message[];
};

export type Message = {
	id: string;
	senderId: string;
	conversationId: string;
	replyTo: string;
	content: string;
	status: 'pending' | 'sent' | 'delivered' | 'read';
	createdAt: string;
	updatedAt: string;
	emotions: MessageEmotion[];
};

export type MessageEmotion = {
	senderId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
};

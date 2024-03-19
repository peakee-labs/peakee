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
	latestMessage?: string;
	latestMessageAt?: string;
	metadata?: {
		name: string;
		image: string;
	};
	/**
	 * this flag is used to indicate if the conversation is not initialized
	 * and use this one to send a create conversation request before sending messages
	 */
	isNotInitialized?: boolean;
};

export type Message = {
	id: string;
	senderId: string;
	conversationId: string;
	replyTo?: string;
	content: string;
	status: 'initial' | 'pending' | 'sent' | 'delivered' | 'read';
	createdAt: string;
	updatedAt: string;
	emotions?: MessageEmotion[];
	/**
	 * use to resolve the message via the websocket after receiving resolve sending message event
	 */
	resolveId: string;
};

export type MessageEmotion = {
	senderId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
};

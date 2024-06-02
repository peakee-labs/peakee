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
	latestMessage?: Message;
	metadata?: {
		name: string;
		image: string;
	};
	/**
	 * this flag is used to indicate if the conversation is not initialized
	 * and use this one to send a create conversation request before sending messages
	 */
	isNotInitialized?: boolean;

	/**
	 * client only
	 */
	pendingMessageInput?: string;
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

export type UserExplore = {
	userId: string;
	like: number;
	name: string;
	country: string;
	native: string;
	learnings: string[];
	major: string;
	interests: string[];
};

export type FormName = {
	firstName: string;
	lastName: string;
};

export type FormDateOfBirth = {
	dateOfBirth: string;
};

export type FormLanguage = {
	native: string;
	learnings: Array<string>;
};

export type FormMajor = {
	major: string;
};

export type FormCountry = {
	country: string;
};

export type FormGender = {
	gender: 'male' | 'female' | 'unknown';
};

export type OnboardingValue = FormName &
	FormDateOfBirth &
	FormLanguage &
	FormMajor &
	FormCountry &
	FormGender;

export type FormFeedback = {
	Feedback: string;
};

export type Locale = 'en-US' | 'en' | 'vi';

export type ExplainRequest = {
	text: string;
	sentence: string;
};

export type ExplainResponse = {
	word: string;
	translate: string;
	IPA: string;
	keyWords: string[];
	expandWords: string[];
};

export type ExplainLog = {
	request: ExplainRequest;
	response: ExplainResponse;
};

export type PracticeUnit = {
	word: string;
	explain: string;
	expandWords: string[];
};

export type PracticeFlashCard = {
	id: string;
	frontText: string;
	backText: string;
	theme: string;
};

export type PracticeFlashCardCollectionInformation = {
	id: string;
	name: string;
	description: string;
	total: string[];
	reviewed: string[];
};

export type PracticeFlashCardCollection = {
	flashcards: PracticeFlashCard[];
	metadata: PracticeFlashCardCollectionInformation;
};

export type UnknownObject = Record<string, never>;

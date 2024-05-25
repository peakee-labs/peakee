export type Flashcard = {
	front: string;
	back: string;
};

const flashcards: Flashcard[] = [
	{ front: 'Hello world', back: 'Xin chào em' },
	{ front: 'Welcome', back: 'Chào mừng' },
	{ front: "How it's going", back: 'Dạo này sao rùi' },
	{ front: 'How are you?', back: 'Ổn không zị?' },
	{ front: 'Long time no see!', back: 'Lâu ngày hè' },
];

export const collection = {
	title: 'How to say hello',
	flashcards,
};

export type Flashcard = {
	id: string;
	front: string;
	back: string;
	theme: 'blue' | 'red' | 'yellow';
};

const flashcards: Flashcard[] = [
	{ id: '1', front: 'Hello world', back: 'Xin chào em', theme: 'blue' },
	{ id: '2', front: 'Welcome', back: 'Chào mừng', theme: 'red' },
	{
		id: '3',
		front: "How it's going",
		back: 'Dạo này sao rùi',
		theme: 'yellow',
	},
	{ id: '4', front: 'How are you?', back: 'Ổn không zị?', theme: 'yellow' },
	{ id: '5', front: 'Long time no see!', back: 'Lâu ngày hè', theme: 'blue' },
];

export const collection = {
	title: 'How to say hello',
	flashcards,
};

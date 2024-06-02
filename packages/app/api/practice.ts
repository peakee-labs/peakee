import type {
	ExplainLog,
	PracticeFlashCardCollection,
	PracticeUnit,
} from '../types';

import { axios } from './axios';

export const getRandomPracticeWord = async () => {
	try {
		const { data: word } = await axios().get<PracticeUnit>(
			`/practice/public/unit`,
		);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
};

export const getPracticeWordForUser = async () => {
	try {
		const { data: word } = await axios().get<ExplainLog>(`/practice/unit`);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
};

export const getPracticeFlashCard = async () => {
	try {
		const { data: flashcard } = await axios().get<PracticeUnit>(
			`/practice/unit/flashcard`,
		);
		return flashcard;
	} catch (err) {
		console.log('Error getting practice flashcard', err);
	}
};
export const getFlashCardCollectionDefault = async () => {
	try {
		const { data: collection } =
			await axios().get<PracticeFlashCardCollection>(
				`/practice/flashcards/collections/default`,
			);
		return collection;
	} catch (err) {
		console.log('Error getting flashcard collections', err);
	}
};

export const getFlashCardCollectionById = async (collectionID: string) => {
	try {
		const { data: collection } =
			await axios().get<PracticeFlashCardCollection>(
				`/practice/flashcards/collections/${collectionID}`,
			);
		return collection;
	} catch (err) {
		console.log('Error getting flashcard collections', err);
	}
};

export const getFlashCardCollectionsInformation = async () => {
	try {
		const { data: collections } = await axios().get<
			PracticeFlashCardCollection[]
		>(`/practice/flashcards/collections/preview`);
		return collections;
	} catch (err) {
		console.log('Error getting flashcard collections', err);
	}
};

export const getPendingExplainLog = async () => {
	try {
		const { data: collections } =
			await axios().get<PracticeFlashCardCollection>(
				`/practice/flashcards/sync-explain-logs`,
			);
		return collections;
	} catch (err) {
		console.log('Error getting flashcard collections', err);
	}
};

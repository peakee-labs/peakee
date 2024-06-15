import type {
	ExplainFlashcardPendingInformation,
	ExplainLog,
	PracticeFlashCardCollection,
	PracticeUnit,
} from '@peakee/types';

import { axios } from './axios';

export const getRandomPracticeWord = async () => {
	try {
		const { data: word } = await axios().get<PracticeUnit>(
			`/practice/random-review`,
		);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
};

export const getPracticeWordForUser = async () => {
	try {
		const { data: word } = await axios().get<ExplainLog>(
			`/practice/fast-review`,
		);
		return word;
	} catch (err) {
		console.log('Error getting practice word', err);
	}
};

// export const getPracticeFlashCard = async () => {
// 	try {
// 		const { data: flashcard } = await axios().get<PracticeUnit>(
// 			`/practice/unit/flashcard`,
// 		);
// 		return flashcard;
// 	} catch (err) {
// 		console.log('Error getting practice flashcard', err);
// 	}
// };

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

export const fetchPendingExplainStatus = async () => {
	try {
		const { data: collections } =
			await axios().get<ExplainFlashcardPendingInformation>(
				`/practice/explain-log`,
			);
		return collections;
	} catch (err) {
		console.log('Error getting flashcard collections', err);
	}
};

export const syncPendingExplainLog = async () => {
	try {
		const { data: collections } =
			await axios().get<PracticeFlashCardCollection>(
				`/practice/explain-log/flashcard`,
			);
		return collections;
	} catch (err) {
		console.log('Error getting flashcard collections', err);
	}
};

export const updateCardStatus = async (
	collectionID: string,
	cardID: string,
	viewStatus: boolean,
) => {
	try {
		await axios().put(
			`/practice/flashcards/collections/${collectionID}/${cardID}/status?viewed=${viewStatus}`,
		);
		return true;
	} catch (err) {
		console.log('Error updating card status', err);
	}
};

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { PracticeFlashCard, PracticeFlashCardCollection } from '../types';

export interface PracticeState {
	pendingCollection: PracticeFlashCardCollection;
	flashcardCollectionsMap: Record<string, PracticeFlashCardCollection>;
}

const initialState: PracticeState = {
	flashcardCollectionsMap: {},
} as PracticeState;

export const practiceSlice = createSlice({
	name: 'practice',
	initialState,
	reducers: {
		reset: () => ({ ...initialState }),
		addCollectionsInformation: (
			state,
			action: PayloadAction<PracticeFlashCardCollection[]>,
		) => {
			action.payload.forEach((collection) => {
				if (!state.flashcardCollectionsMap[collection.id]) {
					state.flashcardCollectionsMap[collection.id] = collection;
				}
			});
		},
		addPendingCollection: (
			state,
			action: PayloadAction<PracticeFlashCardCollection>,
		) => {
			state.pendingCollection = action.payload;
			state.flashcardCollectionsMap[action.payload.id] = action.payload;
		},
		updateFlashcardViewStatus: (
			state,
			action: PayloadAction<{
				collectionID: string;
				id: string;
				status: boolean;
			}>,
		) => {
			const collection =
				state.flashcardCollectionsMap[action.payload.collectionID];
			if (!collection || !collection.flashcards) {
				return;
			}
			console.log(
				'collection.flashcards[action.payload.idx].id',
				action.payload.id,
			);
			if (action.payload.status) {
				collection.viewed.push(action.payload.id);
			} else {
				collection.viewed = collection.viewed.filter(
					(id) => id !== action.payload.id,
				);
			}
		},
		addCollectionFlashcards: (
			state,
			action: PayloadAction<{
				collectionID: string;
				flashcards: PracticeFlashCard[];
			}>,
		) => {
			const collection =
				state.flashcardCollectionsMap[action.payload.collectionID];
			if (!collection) {
				return;
			}
			collection.flashcards = action.payload.flashcards;
		},
	},
});

export const {
	reset: resetExplore,
	addPendingCollection,
	addCollectionFlashcards,
	updateFlashcardViewStatus,
	addCollectionsInformation,
} = practiceSlice.actions;

export const practiceReducer = practiceSlice.reducer;

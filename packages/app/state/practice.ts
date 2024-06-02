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
	addCollectionsInformation,
} = practiceSlice.actions;

export const practiceReducer = practiceSlice.reducer;

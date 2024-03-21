import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { PublicUserProfile, UserExplore } from '../types';

export interface ExploreState {
	profileLoading: boolean;
	candidates: Record<string, ExploreData>;
}

type ExploreData = {
	explore: UserExplore;
	profile: PublicUserProfile;
};

const initialState: ExploreState = {
	profileLoading: true,
	candidates: {},
} as ExploreState;

export const exploreSlice = createSlice({
	name: 'explore',
	initialState,
	reducers: {
		reset: () => ({ ...initialState }),
		setExploreLoading: (state, action: PayloadAction<boolean>) => {
			state.profileLoading = action.payload;
		},
		setExploreCandidates: (state, action: PayloadAction<ExploreData[]>) => {
			state.candidates = {};
			action.payload.forEach((candidate) => {
				state.candidates[candidate.profile.id] = candidate;
			});
		},
	},
});

export const { setExploreCandidates, setExploreLoading, reset } =
	exploreSlice.actions;

export const exploreReducer = exploreSlice.reducer;

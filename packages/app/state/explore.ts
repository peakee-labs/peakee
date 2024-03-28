import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { PublicUserProfile, UserExplore } from '../types';

export interface ExploreState {
	exploreLoading: boolean;
	profileLoading: boolean;
	profile: UserExplore;
	candidates: Record<string, ExploreData>;
}

type ExploreData = {
	explore: UserExplore;
	profile: PublicUserProfile;
};

const initialState: ExploreState = {
	exploreLoading: true,
	profileLoading: true,
	candidates: {},
	profile: {},
} as ExploreState;

export const exploreSlice = createSlice({
	name: 'explore',
	initialState,
	reducers: {
		reset: () => ({ ...initialState }),
		setExploreProfile: (state, { payload }: PayloadAction<UserExplore>) => {
			state.profile = payload;
		},
		updateExploreProfileLoading: (
			state,
			{ payload }: PayloadAction<boolean>,
		) => {
			state.profileLoading = payload;
		},
		updateExploreLoading: (state, action: PayloadAction<boolean>) => {
			state.exploreLoading = action.payload;
		},
		addExploreCandidate: (state, action: PayloadAction<ExploreData>) => {
			state.candidates[action.payload.profile.id] = action.payload;
		},
		setExploreCandidates: (state, action: PayloadAction<ExploreData[]>) => {
			state.candidates = {};
			action.payload.forEach((candidate) => {
				state.candidates[candidate.profile.id] = candidate;
			});
		},
	},
});

export const {
	setExploreProfile,
	updateExploreProfileLoading,
	setExploreCandidates,
	updateExploreLoading,
	reset,
	addExploreCandidate,
} = exploreSlice.actions;

export const exploreReducer = exploreSlice.reducer;

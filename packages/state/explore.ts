import type { PublicUserProfile, UserExplore } from '@peakee/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ExploreState {
	profile?: UserExplore;
	candidatesMap: Record<string, ExploreData>;
}

type ExploreData = {
	explore: UserExplore;
	profile: PublicUserProfile;
};

const initialState: ExploreState = {
	candidatesMap: {},
	profile: undefined,
} as ExploreState;

export const exploreSlice = createSlice({
	name: 'explore',
	initialState,
	reducers: {
		reset: () => ({ ...initialState }),
		setExploreProfile: (state, { payload }: PayloadAction<UserExplore>) => {
			state.profile = payload;
		},
		addExploreCandidate: (state, action: PayloadAction<ExploreData>) => {
			state.candidatesMap[action.payload.profile.id] = action.payload;
		},
		setExploreCandidates: (state, action: PayloadAction<ExploreData[]>) => {
			state.candidatesMap = {};
			action.payload.forEach((candidate) => {
				state.candidatesMap[candidate.profile.id] = candidate;
			});
		},
	},
});

export const {
	setExploreProfile,
	setExploreCandidates,
	reset: resetExplore,
	addExploreCandidate,
} = exploreSlice.actions;

export const exploreReducer = exploreSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { PublicUserProfile, UserProfile } from '../types';

export interface UserState {
	profile?: UserProfile;
	profileLoading: boolean;
	friends: Record<string, PublicUserProfile>;
}

// TODO: profileLoading must be false at init
const initialState: UserState = {
	profileLoading: true,
	friends: {},
} as UserState;

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: () => ({} as UserState),
		setProfile: (state, action: PayloadAction<UserProfile>) => {
			state.profile = action.payload;
		},
		setProfileLoading: (state, action: PayloadAction<boolean>) => {
			state.profileLoading = action.payload;
		},
		setFriendProfile: (state, action: PayloadAction<PublicUserProfile>) => {
			const profile = action.payload;
			state.friends[profile.id] = profile;
		},
	},
});

export const {
	setProfile,
	setProfileLoading,
	reset: resetUserState,
	setFriendProfile,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

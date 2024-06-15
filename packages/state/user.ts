import type { PublicUserProfile, UserProfile } from '@peakee/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
	profile?: UserProfile;
	friendsMap: Record<string, PublicUserProfile>;
}

const initialState: UserState = {
	friendsMap: {},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: () => ({} as UserState),
		setProfile: (state, action: PayloadAction<UserProfile>) => {
			state.profile = action.payload;
		},
		setFriendProfile: (state, action: PayloadAction<PublicUserProfile>) => {
			const profile = action.payload;
			state.friendsMap[profile.id] = profile;
		},
	},
});

export const {
	setProfile,
	reset: resetUserState,
	setFriendProfile,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

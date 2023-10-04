import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { UserProfile } from '../types';

export interface UserState {
	profile?: UserProfile;
}

const initialState: UserState = {};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setProfile: (state, action: PayloadAction<UserProfile>) => {
			state.profile = action.payload;
		},
	},
});

export const { setProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;

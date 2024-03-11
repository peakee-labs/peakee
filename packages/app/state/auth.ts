import type { AuthData } from '@peakee/db/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
	authData?: AuthData;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: () => initialState,
		setAuth: (state, action: PayloadAction<AuthData>) => {
			state.authData = action.payload;
		},
	},
});

export const { reset, setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;

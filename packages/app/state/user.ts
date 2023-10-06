import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ChatRoom, UserChatData, UserProfile } from '../types';

export interface UserState {
	profile?: UserProfile;
	chatData?: UserChatData;
	chatRooms?: ChatRoom[];
	friends?: UserChatData[];
}

const initialState: UserState = {};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: () => initialState,
		setProfile: (state, action: PayloadAction<UserProfile>) => {
			console.log('Set user profile', action.payload.email);
			state.profile = action.payload;
		},
		setChatData: (state, action: PayloadAction<UserChatData>) => {
			console.log('Set user chat data', action.payload.email);
			state.chatData = action.payload;
		},
		setFriends: (state, action: PayloadAction<UserChatData[]>) => {
			console.log('Set friends');
			state.friends = action.payload;
		},
		setChatRooms: (state, action: PayloadAction<ChatRoom[]>) => {
			console.log('Set chat rooms', action.payload.length);
			state.chatRooms = action.payload;
		},
	},
});

export const {
	setProfile,
	setChatData,
	setFriends,
	setChatRooms,
	reset: resetUserState,
} = userSlice.actions;
export const userReducer = userSlice.reducer;

import { listenToMessagesOfChatRoom } from '@peakee/db';
import type { ChatRoom, Message, UserChatData } from '@peakee/db/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { UserProfile } from '../types';

export interface UserState {
	profile?: UserProfile;
	profileLoading: boolean;
	chatData?: UserChatData;
	chatRooms?: ChatRoom[];
	friends?: UserChatData[];
}

const initialState: UserState = {
	profileLoading: true,
} as UserState;

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: () => initialState,
		setProfile: (state, action: PayloadAction<UserProfile>) => {
			console.log('Set user profile', action.payload.email);
			state.profile = action.payload;
		},
		setProfileLoading: (state, action: PayloadAction<boolean>) => {
			state.profileLoading = action.payload;
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
			const chatRooms = action.payload;
			state.chatRooms = chatRooms;
			Promise.all(
				chatRooms.map((room) => {
					listenToMessagesOfChatRoom(room.id);
				}),
			);
		},
		setLatestMessageOfChatRoom: (state, action: PayloadAction<Message>) => {
			if (!state.chatRooms) {
				console.log('Chat room is not initialized to receive message');
				return;
			}

			const roomIdx = state.chatRooms.findIndex(
				(room) => room.id === action.payload.roomId,
			);

			if (roomIdx !== -1) {
				state.chatRooms[roomIdx].latestMessage = action.payload;
			}

			state.chatRooms.sort((r1, r2) => {
				const r1LastedDate = new Date(r1.latestMessage?.time || 0);
				const r2LastedDate = new Date(r2.latestMessage?.time || 0);

				return r1LastedDate < r2LastedDate ? 1 : -1;
			});
		},
	},
});

export const {
	setProfile,
	setProfileLoading,
	setChatData,
	setFriends,
	setChatRooms,
	reset: resetUserState,
	setLatestMessageOfChatRoom,
} = userSlice.actions;
export const userReducer = userSlice.reducer;

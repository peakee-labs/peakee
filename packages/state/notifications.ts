import type { FriendRequest, PublicUserProfile } from '@peakee/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface NotificationsState {
	friendRequests: FriendRequest[];
	friendRequestsLoading: boolean;
}

const initialState: NotificationsState = {
	friendRequests: [],
	friendRequestsLoading: true,
};

export const notificationsSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: () => {
			return { ...initialState, friendRequestsLoading: false };
		},
		setFriendRequests: (state, action: PayloadAction<FriendRequest[]>) => {
			state.friendRequests = action.payload;
			state.friendRequestsLoading = false;
		},
		appendFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
			state.friendRequests.unshift(action.payload);
		},
		removeFriendRequest: (
			state,
			action: PayloadAction<{ index: number }>,
		) => {
			state.friendRequests.splice(action.payload.index, 1);
		},
		updateUserProfileOfFriendRequest: (
			state,
			action: PayloadAction<{ index: number; user: PublicUserProfile }>,
		) => {
			state.friendRequests[action.payload.index].user =
				action.payload.user;
		},
	},
});

export const {
	reset: resetNotifications,
	setFriendRequests,
	appendFriendRequest,
	removeFriendRequest,
	updateUserProfileOfFriendRequest,
} = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;

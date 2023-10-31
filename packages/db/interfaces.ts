import type { ChatRoom, Message, UserChatData } from './types';

export type CreateNewUserFunction = (
	user: Omit<UserChatData, 'id'>,
) => Promise<UserChatData>;

export type GetUserByIDFunction = (
	id: string,
) => Promise<UserChatData | undefined>;

export type GetUserByFirebaseUIDFunction = (
	uid: string,
) => Promise<UserChatData | undefined>;

export type GetUserByEmailFunction = (
	email: string,
) => Promise<UserChatData | undefined>;

export type GetUsersFunction = (ids: string[]) => Promise<UserChatData[]>;

export type UpdateFriendFunction = (
	user: UserChatData,
	friend: UserChatData,
) => Promise<void>;

export type CreateNewChatRoomFunction = (
	room: Omit<ChatRoom, 'id'>,
) => Promise<ChatRoom>;

export type GetChatRoomsFunction = (ids: string[]) => Promise<ChatRoom[]>;

export type CreateNewMessageFunction = (
	user: Omit<Message, 'id'>,
) => Promise<Message>;

export type ListenMessagesOfChatRoomFunction = (roomId: string) => void;

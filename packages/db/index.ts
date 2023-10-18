import type {
	CreateNewChatRoomFunction,
	CreateNewMessageFunction,
	CreateNewUserFunction,
	GetChatRoomsFunction,
	GetUserByEmailFunction,
	GetUserByFirebaseUIDFunction,
	GetUserByIDFunction,
	GetUsersFunction,
	UpdateFriendFunction,
} from './interfaces';

type InjectedFunctions = {
	createNewUser: CreateNewUserFunction;
	getUserByID: GetUserByIDFunction;
	getUserByFirebaseUID: GetUserByFirebaseUIDFunction;
	getUserByEmail: GetUserByEmailFunction;
	getUsers: GetUsersFunction;
	updateFriend: UpdateFriendFunction;
	createNewChatRoom: CreateNewChatRoomFunction;
	getChatRooms: GetChatRoomsFunction;
	createNewMessage: CreateNewMessageFunction;
};

export * from './interfaces';
export let createNewUser: CreateNewUserFunction;
export let getUserByID: GetUserByIDFunction;
export let getUserByFirebaseUID: GetUserByFirebaseUIDFunction;
export let getUserByEmail: GetUserByEmailFunction;
export let getUsers: GetUsersFunction;
export let updateFriend: UpdateFriendFunction;
export let createNewChatRoom: CreateNewChatRoomFunction;
export let getChatRooms: GetChatRoomsFunction;
export let createNewMessage: CreateNewMessageFunction;

export const injectFirestoreFunctions = (functions: InjectedFunctions) => {
	console.log('Injecting db functions');
	createNewUser = functions.createNewUser;
	getUserByID = functions.getUserByID;
	getUserByFirebaseUID = functions.getUserByFirebaseUID;
	getUserByEmail = functions.getUserByEmail;
	getUsers = functions.getUsers;
	updateFriend = functions.updateFriend;
	createNewChatRoom = functions.createNewChatRoom;
	getChatRooms = functions.getChatRooms;
	createNewMessage = functions.createNewMessage;
};

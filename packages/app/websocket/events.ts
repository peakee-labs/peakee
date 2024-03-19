import type { Message } from '../types';

export enum EventType {
	USER_SEND_MESSAGE = 'USER:SEND_MESSAGE',
	SERVER_ACK_SEND_MESSAGE = 'SERVER:ACK_SEND_MESSAGE',
	SERVER_SEND_MESSAGE = 'SERVER:SEND_MESSAGE',
}

export type EventPayload = {
	type: EventType;
};

export type AckSendMessagePayload = EventPayload & {
	resolveId: string;
	message: Message;
	error: { error: string };
};

export type NewMessagePayload = EventPayload & {
	message: Message;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ackSendMessage = {
	type: 'SERVER:ACK_SEND_MESSAGE',
	resolveId: 'LXHLgkJylN',
	message: {
		id: '65f93ce7bdbf7acde0501a21',
		senderId: '65f69263ecd372d0c5ae7ab7',
		conversationId: '65f93ce66ea6243b7bac7b6a',
		content: 'hello world',
		status: 'delivered',
		createdAt: '2024-03-19T07:21:11.234Z',
		updatedAt: '2024-03-19T07:21:11.234Z',
		emotions: [],
	},
	error: { error: '' },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const serverSendMessage = {
	type: 'SERVER:SEND_MESSAGE',
	message: {
		id: '65f955163c67045b071a8b63',
		senderId: '65f69263ecd372d0c5ae7ab7',
		conversationId: '65f9549199e5ce158a036a45',
		content: 'hello my girl',
		status: 'delivered',
		createdAt: '2024-03-19T09:04:22.951Z',
		updatedAt: '2024-03-19T09:04:22.951Z',
		emotions: [],
	},
};

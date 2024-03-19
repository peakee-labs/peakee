import { EventType } from './events';
import { WS_TYPE, wsMap } from './init';

export type SendMessagePayload = {
	content: string;
	conversationId: string;
	replyTo?: string;
	resolveId: string;
};

export function sendMessage(message: SendMessagePayload) {
	const ws = wsMap.get(WS_TYPE.DEFAULT);
	if (!ws) throw Error("Websocket isn't initialized");

	ws.connection.send(
		JSON.stringify({
			action: 'chat',
			type: EventType.USER_SEND_MESSAGE,
			content: message.content,
			conversationId: message.conversationId,
			replyTo: message.replyTo,
			resolveId: message.resolveId,
		}),
	);
}

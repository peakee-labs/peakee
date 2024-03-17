import { config } from '../utils';

export function initWebsocket(endpoint: string, token: string) {
	const ws = new WebSocket(`${endpoint}?token=${token}`);

	ws.onmessage = (event) => {
		console.log(event.data);
	};

	ws.onopen = () => {
		console.log('Connected to websocket');
	};

	return ws;
}

enum WS_TYPE {
	DEFAULT,
}

export const wsMap: Map<WS_TYPE, { ws: WebSocket; id: string }> = new Map();

export const initWebsocketWithProfile = (userId: string, jwt: string) => {
	if (wsMap.has(WS_TYPE.DEFAULT)) {
		wsMap.get(WS_TYPE.DEFAULT)?.ws.close();
		wsMap.delete(WS_TYPE.DEFAULT);
	}

	wsMap.set(WS_TYPE.DEFAULT, {
		ws: initWebsocket(config().PEAKEE_WS_URL, jwt),
		id: userId,
	});
};

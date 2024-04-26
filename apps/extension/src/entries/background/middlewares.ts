import type { Kernel, Middleware } from '@metacraft/crab/core';
import * as api from '@peakee/app/api';

import { launchSignIn, signInWithToken } from '../../utils/auth';
import type { Channels, Events } from '../../utils/messaging';

import { logger } from './utils';

export const handleSignIn: Middleware = async (_, respond) => {
	const token = await launchSignIn();
	const user = await signInWithToken(token);
	respond({ user });
};

export const requestLogger = (kernel: Kernel<Channels, Events>): Middleware => {
	return (request, _, next) => {
		const { channelId } = kernel.getRequestContext(request.id);
		logger.log(`Handle ${request.type} from ${channelId}`);
		next?.(request);
	};
};

type ProxyPayload = {
	key: string;
	args: unknown[];
};

export const handleProxyRequest: Middleware<Events, ProxyPayload> = async (
	request,
	respond,
) => {
	const { key, args } = request;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const res = await (api[key as never] as any)(...args);
	respond(res);
};

// export const handleGetIdToken: Middleware = async (_, respond) => {
// 	respond({
// 		token: await auth.currentUser?.getIdToken(),
// 	});
// };

// export const handleTranslate: Middleware<Events, TranslatePayload> = async (
// 	request,
// 	respond,
// ) => {
// 	const { text, languages } = request;
// 	const res = await translate(text, languages);
// 	if (!res) {
// 		throw Error("Can't translate");
// 	}
// 	respond(res);
// };

// export const handleExplain: Middleware<Events, ExplainPayload> = async (
// 	request,
// 	respond,
// ) => {
// 	const { text, sentence } = request;
// 	const res = await explainTextInSentence(text, sentence);
// 	if (!res) {
// 		throw Error("Can't translate");
// 	}
// 	respond(res);
// };

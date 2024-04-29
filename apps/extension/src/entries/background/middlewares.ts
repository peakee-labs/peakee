import type { Kernel, Middleware } from '@metacraft/crab/core';
import { explainTextInSentence, translate } from '@peakee/app/api';

import { signIn } from '../../utils/auth';
import type {
	Channels,
	Events,
	ExplainPayload,
	TranslatePayload,
} from '../../utils/messaging';

import { logger } from './utils';

export const handleSignIn: Middleware = async (_, respond) => {
	const user = await signIn();
	respond({ user });
};

export const requestLogger = (kernel: Kernel<Channels, Events>): Middleware => {
	return (request, _, next) => {
		const { channelId } = kernel.getRequestContext(request.id);
		logger.log(`Handle ${request.type} from ${channelId}`);
		next?.(request);
	};
};

export const handleRequestTranslate: Middleware<
	Events,
	TranslatePayload
> = async (request, respond) => {
	const { text, languages } = request;
	const res = await translate(text, languages);
	if (res) respond(res);
	else throw Error("Can't translate");
};

export const handleRequestExplain: Middleware<Events, ExplainPayload> = async (
	request,
	respond,
) => {
	const { text, sentence } = request;
	const res = await explainTextInSentence(text, sentence);
	if (res) respond(res);
	else throw Error("Can't explain");
};

import type { Kernel, Middleware } from '@metacraft/crab/core';
import { explainPhraseInSentence, translate } from '@peakee/api';
import { signInWithGoogle } from '@peakee/auth';
import { logger } from '@peakee/logger';

import type {
	Channels,
	Events,
	ExplainPayload,
	TranslatePayload,
} from '../utils/messaging';

export const handleSignIn: Middleware = async (_, respond) => {
	const user = await signInWithGoogle();
	respond({ user });
};

export const requestLogger = (kernel: Kernel<Channels, Events>): Middleware => {
	return (request, _, next) => {
		const { channelId } = kernel.getRequestContext(request.id);
		logger().debug(`Handle ${request.type} from ${channelId}`);
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
	const { phrase, sentence } = request;
	const res = await explainPhraseInSentence(phrase, sentence);
	if (res) respond(res);
	else throw Error("Can't explain");
};

export const handleOpenPanel: Middleware<
	Events,
	unknown,
	chrome.runtime.MessageSender
> = async (request, respond) => {
	const windowId = request.context?.tab?.windowId;
	if (windowId) chrome.sidePanel.open({ windowId });
	respond({});
};

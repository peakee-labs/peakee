import { ChromeChannel } from '@metacraft/crab/chrome';
import type {
	ExplainTextInSentenceResponse,
	TranslateResponse,
} from '@peakee/app/api';

import type { ExplainPayload, TranslatePayload } from '../../utils/messaging';
import { Channels, Events } from '../../utils/messaging';

import { logger } from './utils';

export const channel = new ChromeChannel(Channels.ContentScript);

const ONE_MINUTES = 1000 * 60;
const FIVE_MINUTES = 1000 * 60 * 5;

export const signInFromContentScript = async () => {
	await channel.request<{ token: string }>(
		{ type: Events.SIGN_IN },
		FIVE_MINUTES,
	);
};

export const requestTranslate = async (payload: TranslatePayload) => {
	try {
		const res = await channel.request<TranslateResponse>(
			{ type: Events.REQUEST_TRANSLATE, ...payload },
			ONE_MINUTES,
		);

		return res;
	} catch (error) {
		logger.warn(error);
	}
};

export const requestExplain = async (payload: ExplainPayload) => {
	try {
		const res = await channel.request<ExplainTextInSentenceResponse>(
			{ type: Events.REQUEST_EXPLAIN, ...payload },
			ONE_MINUTES,
		);

		return res;
	} catch (error) {
		logger.warn(error);
	}
};

import type {
	ExplainFunction,
	ExplainTextInSentenceResponse,
	TranslateFunction,
	TranslateResponse,
} from '@peakee/app/api';

import type { ExplainPayload, TranslatePayload } from '../../utils/messaging';
import { Events } from '../../utils/messaging';

import { channel } from './channel';
import { logger } from './utils';

const ONE_MINUTES = 1000 * 60;
const FIVE_MINUTES = 1000 * 60 * 5;

export const signInFromContentScript = async () => {
	await channel.request<{ token: string }>(
		{ type: Events.SIGN_IN },
		FIVE_MINUTES,
	);
};

export const requestTranslateViaMessaging: TranslateFunction = async (
	text,
	languages,
) => {
	const payload: TranslatePayload = {
		text,
		languages,
	};
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

export const requestExplainViaMessage: ExplainFunction = async (
	text,
	sentence,
) => {
	const payload: ExplainPayload = {
		text,
		sentence,
	};
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

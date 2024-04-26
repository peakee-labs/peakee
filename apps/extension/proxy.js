import { ChromeChannel } from '@metacraft/crab/chrome';
import * as api from '@peakee/app/api';

import { Channels, Events } from './src/utils/messaging';

export const channel = new ChromeChannel(Channels.ContentScript);

const functionsMap = api;
Object.keys(api).map((key) => {
	functionsMap[key] = async (...args) => {
		return channel.request({ type: Events.PROXY_REQUEST, key, args });
	};
});

export const { translate, explainTextInSentence } = functionsMap;

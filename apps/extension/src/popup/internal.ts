import { ChromeChannel } from '@metacraft/crab/chrome';
import { createLogger, setDefaultLogger } from '@peakee/logger';

/**
 * apply persist app state before render
 */
import '@peakee/state/persist';

import { Channels, Events } from '../utils/messaging';

setDefaultLogger(createLogger('Popup'));

export const channel = new ChromeChannel(Channels.Popup);

export const signInFromPopupPage = async () => {
	await channel.request({ type: Events.SIGN_IN });
};

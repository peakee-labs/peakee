import { ChromeChannel } from '@metacraft/crab/chrome';
import { createLogger, setDefaultLogger } from '@peakee/logger';

/**
 * apply persist app state before render
 */
import '@peakee/state/persist';

import { Channels, Events } from '../utils/messaging';

setDefaultLogger(createLogger('SidePanel'));

export const channel = new ChromeChannel(Channels.SidePanel);

export const signInFromSidePanel = async () => {
	await channel.request({ type: Events.SIGN_IN });
};

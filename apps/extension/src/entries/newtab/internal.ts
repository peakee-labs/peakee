import { ChromeChannel } from '@metacraft/crab/chrome';

/**
 * apply persist app state before render
 */
import '@peakee/state/persist';
import '@peakee/config';

import { Channels, Events } from '../../utils/messaging';

export const channel = new ChromeChannel(Channels.NewTab);

export const signInFromPopupPage = async () => {
	await channel.request({ type: Events.SIGN_IN });
};

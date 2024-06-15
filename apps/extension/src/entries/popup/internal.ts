import { ChromeChannel } from '@metacraft/crab/chrome';
import { createLogger, setDefaultLogger } from '@peakee/logger';

import { Channels, Events } from '../../utils/messaging';

setDefaultLogger(createLogger('Popup'));

export const channel = new ChromeChannel(Channels.Popup);

export const signInFromPopupPage = async () => {
	await channel.request({ type: Events.SIGN_IN });
};

import { ChromeChannel } from '@metacraft/crab/chrome';
import { createLogger } from '@peakee/logger';

import { setUtilsLogger } from '../../utils/logger';
import { Channels, Events } from '../../utils/messaging';

export const logger = createLogger('Newtab');
setUtilsLogger(logger);

export const channel = new ChromeChannel(Channels.NewTab);

export const signInFromPopupPage = async () => {
	await channel.request({ type: Events.SIGN_IN });
};

import { ChromeChannel } from '@metacraft/crab/chrome';

import { Channels, Events } from '../../utils/messaging';

export const channel = new ChromeChannel(Channels.NewTab);

export const signInFromPopupPage = async () => {
	await channel.request({ type: Events.SIGN_IN });
};

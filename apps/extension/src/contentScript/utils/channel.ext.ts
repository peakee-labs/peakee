import { ChromeChannel } from '@metacraft/crab/chrome';
import { logger } from '@peakee/logger';

import { Channels } from '../../utils/messaging';

export const channel = new ChromeChannel(Channels.ContentScript, {
	autoReconnect: true,
});

channel.connection.onDisconnect.addListener(() => {
	logger().warn('Port disconnected, attempting to reconnect...');
});

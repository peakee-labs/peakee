import { ChromeChannel } from '@metacraft/crab/chrome';

import { Channels } from '../../utils/messaging';

export const channel = new ChromeChannel(Channels.ContentScript);

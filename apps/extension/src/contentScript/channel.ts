import { WebChannel } from '@metacraft/crab/web';

import { Channels } from '../utils/messaging';

export const channel = new WebChannel(Channels.ContentScript);

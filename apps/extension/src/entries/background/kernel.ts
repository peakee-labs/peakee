import { WebKernel } from '@metacraft/crab/web';

import type { Channels, Events } from '../../utils/messaging';

export const kernel = new WebKernel<Channels, Events>();

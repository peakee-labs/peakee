import { ChromeKernel } from '@metacraft/crab/chrome';

import type { Channels, Events } from '../../utils/messaging';

export const kernel = new ChromeKernel<Channels, Events>();

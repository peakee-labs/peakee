import { ChromeKernel } from '@metacraft/crab/chrome';

import { initApp } from '../../utils/bootstrap';
import { Channels, Events } from '../../utils/messaging';

import { handleSignIn, requestLogger } from './middlewares';
import { logger } from './utils';

logger.log('This is the background page.');
logger.log('Put the background scripts here.');

initApp();

const kernel = new ChromeKernel<Channels, Events>();

kernel
	.use(requestLogger(kernel))
	.channel(Channels.Popup)
	.handle(Events.SIGN_IN)
	.use(handleSignIn)
	.unwrap()
	.run();

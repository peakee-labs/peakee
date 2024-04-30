import { initAppAxios } from '@peakee/app/api/axios';

import { initApp } from '../../utils/bootstrap';

initApp();
initAppAxios('fetch' as never);

import '../../utils/auth';

import { Channels, Events } from '../../utils/messaging';

import { kernel } from './kernel';
import {
	handleRequestExplain,
	handleRequestTranslate,
	handleSignIn,
	requestLogger,
} from './middlewares';
import { logger } from './utils';

logger.log('This is the background page.');
logger.log('Put the background scripts here.');

kernel
	.use(requestLogger(kernel))

	.channel(Channels.Popup)
	.handle(Events.SIGN_IN)
	.use(handleSignIn)

	.channel(Channels.ContentScript)
	.handle(Events.REQUEST_TRANSLATE)
	.use(handleRequestTranslate)
	.handle(Events.REQUEST_EXPLAIN)
	.use(handleRequestExplain)

	.unwrap()
	.run();

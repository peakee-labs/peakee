import { logger } from '@peakee/logger';

import './init';

import { Channels, Events } from '../utils/messaging';

import { kernel } from './kernel';
import {
	handleRequestExplain,
	handleRequestTranslate,
	handleSignIn,
	requestLogger,
} from './middlewares';
import { keepBackgroundAlive } from './utils';

keepBackgroundAlive();

logger().log('Background script is running');

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

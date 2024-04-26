/**
 * apply persist app state for sync storage
 */
import { applyPersistAppState } from '../../utils/state';
applyPersistAppState();

import { ChromeKernel } from '@metacraft/crab/chrome';

import { initApp } from '../../utils/bootstrap';
import { Channels, Events } from '../../utils/messaging';

import { handleProxyRequest, handleSignIn, requestLogger } from './middlewares';
import { logger } from './utils';

logger.log('This is the background page.');
logger.log('Put the background scripts here.');

initApp();

const kernel = new ChromeKernel<Channels, Events>();

/**
 * note: firebase uses indexDB for storing auth credentials,
 * so firebase from contentScript is not in extension runtime.
 * We need to centralize auth inside background.
 */
kernel
	.use(requestLogger(kernel))

	.channel(Channels.Popup)
	.handle(Events.SIGN_IN)
	.use(handleSignIn)

	.channel(Channels.ContentScript)
	.handle(Events.SIGN_IN)
	.use(handleSignIn)
	.handle(Events.PROXY_REQUEST)
	.use(handleProxyRequest)

	.run();

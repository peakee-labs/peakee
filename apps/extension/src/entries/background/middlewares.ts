import type { Kernel, Middleware } from '@metacraft/crab/core';

import { signIn } from '../../utils/auth';
import type { Channels, Events } from '../../utils/messaging';

import { logger } from './utils';

export const handleSignIn: Middleware = async (_, respond) => {
	const user = await signIn();
	respond({ user });
};

export const requestLogger = (kernel: Kernel<Channels, Events>): Middleware => {
	return (request, _, next) => {
		const { channelId } = kernel.getRequestContext(request.id);
		logger.log(`Handle ${request.type} from ${channelId}`);
		next?.(request);
	};
};

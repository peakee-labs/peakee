import type { Logger } from '@peakee/logger';

export let logger: Logger;

export const setUtilsLogger = (_logger: Logger) => {
	if (logger) throw Error('Logger already set');
	logger = _logger;
};

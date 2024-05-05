import type { Logger } from '@peakee/logger';

export let logger: Logger;

export const setUtilsLogger = (_logger: Logger) => {
	logger = _logger;
};

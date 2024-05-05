import { createLogger } from '@peakee/logger';

import { setUtilsLogger } from '../../utils/logger';

export const logger = createLogger('Background');
setUtilsLogger(logger);

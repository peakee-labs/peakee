import { createLogger, setDefaultLogger } from '@peakee/logger';
setDefaultLogger(createLogger('ContentScript'));

import '@peakee/config';
import '@peakee/state/persist';

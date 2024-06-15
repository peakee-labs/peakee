import { createLogger, setDefaultLogger } from '@peakee/logger';

setDefaultLogger(createLogger('ContentScript'));

/**
 * apply persist app state before render
 */
import '@peakee/state/persist';
import '@peakee/config';

import { createLogger, setDefaultLogger } from '@peakee/logger';

setDefaultLogger(createLogger('Newtab'));

/**
 * apply persist app state before render
 */
import '@peakee/state/persist';
import '@peakee/config';

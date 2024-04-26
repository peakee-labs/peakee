/**
 * apply persist app state before render
 * contentScript does not have app state, it can only use some functions in proxy whitelist
 */
import { createRoot } from 'react-dom/client';

import { initApp } from '../../utils/bootstrap';

import ContentApp from './ContentApp';
import { logger } from './utils';

logger.log('Content script works');

initApp();

const container = document.createElement('div');
container.id = 'peakee-container';
document.body.appendChild(container);

const root = createRoot(container);
root.render(<ContentApp />);

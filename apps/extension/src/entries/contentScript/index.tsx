import { createRoot } from 'react-dom/client';

import ContentApp from './ContentApp';
import { logger } from './utils';

logger.log('Content script works');

const container = document.createElement('div');
container.id = 'peakee-container';
document.body.appendChild(container);

const root = createRoot(container);
root.render(<ContentApp />);

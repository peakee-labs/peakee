import { createRoot } from 'react-dom/client';
import { logger } from '@peakee/logger';

import './utils/init';
import '../utils/global';

import ContentApp from './ContentApp';

logger().log('Content script is running');

const container = document.createElement('div');
container.id = 'peakee-container';
document.body.appendChild(container);

const root = createRoot(container);

// currently ContentApp is stateless, all needed state coming from background
root.render(<ContentApp />);

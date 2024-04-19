import { createRoot } from 'react-dom/client';
import { initAppConfig } from '@peakee/app/utils';

import ContentApp from './ContentApp';
import { logger } from './utils';

logger.log('Content script works');

initAppConfig({
	PEAKEE_API_URL,
	PEAKEE_WS_URL,
	BLINDERS_EXPLORE_URL,
	BLINDERS_PRACTICE_URL,
});

const container = document.createElement('div');
container.id = 'peakee-container';
document.body.appendChild(container);

const root = createRoot(container);
root.render(<ContentApp />);

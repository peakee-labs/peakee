import { createRoot } from 'react-dom/client';
import { initAppConfig } from '@peakee/app/utils';

import Popup from './Popup';

initAppConfig({ PEAKEE_API_URL, PEAKEE_WS_URL, BLINDERS_EXPLORE_URL });

const container = document.getElementById('app-container');
if (container) {
	const root = createRoot(container);
	root.render(<Popup />);
}
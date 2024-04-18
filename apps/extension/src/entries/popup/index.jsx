import { createRoot } from 'react-dom/client';
import { initAppConfig } from '@peakee/app/utils';

import Popup from './Popup';

// eslint-disable-next-line no-undef
initAppConfig({
	PEAKEE_API_URL,
	PEAKEE_WS_URL,
	BLINDERS_EXPLORE_URL,
	BLINDERS_PRACTICE_URL,
});

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(<Popup />);

import { createRoot } from 'react-dom/client';
import { initAppConfig } from '@peakee/app/utils';

import Newtab from './Newtab';

// eslint-disable-next-line no-undef
initAppConfig({ PEAKEE_API_URL, PEAKEE_WS_URL, BLINDERS_EXPLORE_URL });

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(<Newtab />);

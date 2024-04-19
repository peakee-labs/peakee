import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@peakee/app/state';
import { initAppConfig } from '@peakee/app/utils';

import Newtab from './Newtab';

// eslint-disable-next-line no-undef
initAppConfig({
	PEAKEE_API_URL,
	PEAKEE_WS_URL,
	BLINDERS_EXPLORE_URL,
	BLINDERS_PRACTICE_URL,
});

const container = document.getElementById('app-container');
if (container) {
	const root = createRoot(container);
	root.render(
		<Provider store={store}>
			<Newtab />
		</Provider>,
	);
}

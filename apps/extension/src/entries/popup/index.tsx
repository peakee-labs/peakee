/**
 * apply persist app state before render
 */
import { applyPersistAppState } from '../../utils/state';
applyPersistAppState();

import { createRoot } from 'react-dom/client';
import { StateProvider } from '@peakee/app/state';
import { initAppConfig } from '@peakee/app/utils';

import withAuth from '../../utils/withAuth';

import Popup from './Popup';

initAppConfig({ PEAKEE_API_URL, PEAKEE_WS_URL, BLINDERS_EXPLORE_URL });

const AuthorizedPopup = withAuth(Popup);
const container = document.getElementById('app-container');
if (container) {
	const root = createRoot(container);
	root.render(
		<StateProvider>
			<AuthorizedPopup />
		</StateProvider>,
	);
}

/**
 * apply persist app state before render
 */
import { applyPersistAppState } from '../../utils/state';
applyPersistAppState();

import { createRoot } from 'react-dom/client';
import { StateProvider } from '@peakee/app/state';

import { initApp } from '../../utils/bootstrap';
import withAuth from '../../utils/withAuth';

import Popup from './Popup';

initApp();

const AuthorizedPopup = withAuth(Popup, {
	containerStyle: {
		width: 500,
		height: 400,
		padding: 20,
	},
	signInBoxStyle: {
		height: '100%',
		width: '100%',
		borderWidth: 0,
	},
});

const container = document.getElementById('app-container');
if (container) {
	const root = createRoot(container);
	root.render(
		<StateProvider>
			<AuthorizedPopup />
		</StateProvider>,
	);
}

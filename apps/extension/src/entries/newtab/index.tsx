import './internal';

/**
 * apply persist app state before render
 */
import { applyPersistAppState } from '../../utils/state';

applyPersistAppState();
initApp();
// initAppAxios('fetch' as never);

import { createRoot } from 'react-dom/client';
import { StateProvider } from '@peakee/app/state';

import '../../utils/global';

import { initApp } from '../../utils/bootstrap';
import withAuth from '../../utils/withAuth';

import Newtab from './Newtab';

const AuthorizedNewTab = withAuth(Newtab, {
	showSignOut: true,
	containerStyle: {
		height: '100vh' as never,
	},
	signInBoxStyle: {
		paddingVertical: 60,
		paddingHorizontal: 40,
		width: 460,
		gap: 100,
	},
	signOutButtonStyle: {
		marginLeft: 20,
	},
});
const container = document.getElementById('app-container');
if (container) {
	const root = createRoot(container);
	root.render(
		<StateProvider>
			<AuthorizedNewTab />
		</StateProvider>,
	);
}

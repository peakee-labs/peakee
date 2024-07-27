import { createRoot } from 'react-dom/client';
import { StateProvider } from '@peakee/state';

import './internal';
import '../utils/global';

import withAuth from '../utils/withAuth';

import { signInFromSidePanel } from './internal';
import SidePanel from './SidePanel';

const AuthorizedSidePanel = withAuth(SidePanel, {
	customSignIn: signInFromSidePanel,
	containerStyle: {
		alignSelf: 'center',
		width: 500,
		height: 600,
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
		<StateProvider enablePersist={false}>
			<AuthorizedSidePanel />
		</StateProvider>,
	);
}

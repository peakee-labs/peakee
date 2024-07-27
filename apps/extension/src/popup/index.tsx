import { createRoot } from 'react-dom/client';
import { StateProvider } from '@peakee/state';

import './internal';
import '../utils/global';

import withAuth from '../utils/withAuth';

import { signInFromPopupPage } from './internal';
import Popup from './Popup';

const AuthorizedPopup = withAuth(Popup, {
	customSignIn: signInFromPopupPage,
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
		<StateProvider enablePersist={false}>
			<AuthorizedPopup />
		</StateProvider>,
	);
}

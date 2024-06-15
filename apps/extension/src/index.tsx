import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import { StateProvider } from '@peakee/state';

import '@peakee/config';
import '@peakee/auth';
import '@peakee/state/persist';
import './utils/global';
import './webPolyfill';
import './entries/background';
import './entries/contentScript';

import Newtab from './entries/newtab/Newtab';
import Popup from './entries/popup/Popup';
import withAuth from './utils/withAuth';
import { App } from './App';
import Component from './Component';
import { Container } from './components';

const AuthorizedApp = withAuth(App);
const AuthorizedPopup = withAuth(Popup);
const AuthorizedNewtab = withAuth(Newtab);

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route
				path="popup"
				element={
					<Container>
						<AuthorizedPopup />
					</Container>
				}
			/>
			<Route
				path="newtab"
				element={
					<Container>
						<AuthorizedNewtab />
					</Container>
				}
			/>
			<Route
				path="component"
				element={
					<Container>
						<Component />
					</Container>
				}
			/>
			<Route
				path="/"
				element={
					<Container>
						<AuthorizedApp />
					</Container>
				}
			/>
			<Route
				path="/*"
				element={
					<Container>
						<AuthorizedApp />
					</Container>
				}
			/>
		</Route>,
	),
);

const container = document.getElementById('app-container');
if (container) {
	const root = createRoot(container);
	root.render(
		<StateProvider>
			<RouterProvider router={router} />
		</StateProvider>,
	);
}

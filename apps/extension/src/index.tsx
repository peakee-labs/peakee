import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import { initAppConfig } from '@peakee/app';
import { store } from '@peakee/app/state';

import './webPolyfill';
import './entries/background';
import './entries/contentScript';

import Newtab from './entries/newtab/Newtab';
import Popup from './entries/popup/Popup';
import { App } from './App';
import { Container } from './components';

// eslint-disable-next-line no-undef
initAppConfig({ PEAKEE_API_URL, PEAKEE_WS_URL, BLINDERS_EXPLORE_URL });

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route
				path="popup"
				element={
					<Container>
						<Popup />
					</Container>
				}
			/>
			<Route
				path="newtab"
				element={
					<Container>
						<Newtab />
					</Container>
				}
			/>
			<Route
				path="/"
				element={
					<Container>
						<App />
					</Container>
				}
			/>
			<Route
				path="/*"
				element={
					<Container>
						<App />
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
		<Provider store={store()}>
			<RouterProvider router={router} />
		</Provider>,
	);
}

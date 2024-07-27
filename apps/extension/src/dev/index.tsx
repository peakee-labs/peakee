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
import '../utils/global';
import '../webPolyfill';
import '../background';
import '../contentScript';

import { withContainer } from '../components';
import Popup from '../popup/Popup';
import { withAuth } from '../utils/withAuth';

import Components from './Component';
import Playground from './Playground';

const WrappedApp = withAuth(withContainer(Playground));
const WrappedPopup = withAuth(withContainer(Popup));
const WrappedComponents = withAuth(withContainer(Components));

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route path="popup" element={<WrappedPopup />} />
			<Route path="component" element={<WrappedComponents />} />
			<Route path="/" element={<WrappedApp />} />
			<Route path="/*" element={<WrappedApp />} />
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

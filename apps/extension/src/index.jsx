import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import { initAppConfig } from '@peakee/app/utils';

import Newtab from './entries/newtab/Newtab';
import Popup from './entries/popup/Popup';
import { App } from './App';

// eslint-disable-next-line no-undef
initAppConfig({ PEAKEE_API_URL, PEAKEE_WS_URL, BLINDERS_EXPLORE_URL });

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="popup" element={<Popup />} />
			<Route path="newtab" element={<Newtab />} />
		</Route>,
	),
);

const container = document.getElementById('app-container');
if (container) {
	const root = createRoot(container);
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}
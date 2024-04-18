import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

import Newtab from './entries/newtab/Newtab';
import Popup from './entries/popup/Popup';
import { App } from './App';
import { Container } from './components';

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
	root.render(<RouterProvider router={router} />);
}

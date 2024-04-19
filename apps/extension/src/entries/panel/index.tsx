import { createRoot } from 'react-dom/client';

import 'react';

import Panel from './Panel';

const container = document.getElementById('app-container');
if (container) {
	const root = createRoot(container);
	root.render(<Panel />);
}

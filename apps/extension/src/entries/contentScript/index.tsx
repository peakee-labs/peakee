import { createRoot } from 'react-dom/client';
import { logger } from '@peakee/logger';
import { StateProvider } from '@peakee/state';

import './init';
import '../../utils/global';

import ContentApp from './ContentApp';

logger().log('Content script is running');

const container = document.createElement('div');
container.id = 'peakee-container';
document.body.appendChild(container);

const root = createRoot(container);
root.render(
	<StateProvider>
		<ContentApp />
	</StateProvider>,
);

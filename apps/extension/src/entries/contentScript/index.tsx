/**
 * apply persist app state before render
 */
import { applyPersistAppState } from '../../utils/state';
applyPersistAppState();

import { createRoot } from 'react-dom/client';
import { StateProvider } from '@peakee/app/state';

import '../../utils/global';

import { initApp } from '../../utils/bootstrap';

import ContentApp from './ContentApp';
import { logger } from './utils';

logger.log('Content script works');

initApp();

const container = document.createElement('div');
container.id = 'peakee-container';
document.body.appendChild(container);

const root = createRoot(container);
root.render(
	<StateProvider>
		<ContentApp />
	</StateProvider>,
);

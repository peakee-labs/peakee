/**
 * apply persist app state before render
 */
applyPersistAppState();

import { createRoot } from 'react-dom/client';
import { logger } from '@peakee/logger';
import { StateProvider } from '@peakee/state';

import '../../utils/global';

import { initApp } from '../../utils/bootstrap';
import { applyPersistAppState } from '../../utils/state';

import ContentApp from './ContentApp';

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

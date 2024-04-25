/**
 * apply persist app state before render
 */
import { applyPersistAppState } from '../../utils/state';
applyPersistAppState();

import { createRoot } from 'react-dom/client';
import { StateProvider } from '@peakee/app/state';
import { initAppConfig } from '@peakee/app/utils';

import withAuth from '../../utils/withAuth';

import ContentApp from './ContentApp';
import { logger } from './utils';

logger.log('Content script works');

initAppConfig({ PEAKEE_API_URL, PEAKEE_WS_URL, BLINDERS_EXPLORE_URL });

const container = document.createElement('div');
container.id = 'peakee-container';
document.body.appendChild(container);

const AuthorizedContentApp = withAuth(ContentApp);
const root = createRoot(container);
root.render(
	<StateProvider>
		<AuthorizedContentApp />
	</StateProvider>,
);

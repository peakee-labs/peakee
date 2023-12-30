import type { FC } from 'react';
import type { AppProps } from 'next/app';

import { StyledComponentsRegistry } from '../components';

import '../styles/globals.css';

export const App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<StyledComponentsRegistry>
			<Component {...pageProps} />
		</StyledComponentsRegistry>
	);
};

export default App;

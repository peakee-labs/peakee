import { useEffect } from 'react';
import type { AppProps } from 'next/app';

import { injectIOC } from '../utils/ioc';

import '../../global.css';

const PeakeeApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		injectIOC();
	}, []);

	return <Component {...pageProps} />;
};

export default PeakeeApp;

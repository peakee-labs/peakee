import type { AppProps } from 'next/app';

import '../../global.css';

const PeakeeApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default PeakeeApp;

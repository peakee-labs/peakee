import { useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@peakee/app/state';
import type { AppProps } from 'next/app';

import { injectIOC } from '../utils/ioc';

import '../../global.css';

const PeakeeApp = ({ Component, pageProps }: AppProps) => {
	const { height } = useWindowDimensions();

	useEffect(() => {
		injectIOC();
	}, []);

	return (
		<Provider store={store}>
			<View style={{ height: height || ('100vh' as never) }}>
				<Component {...pageProps} />
			</View>
		</Provider>
	);
};

export default PeakeeApp;

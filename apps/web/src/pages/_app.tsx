import { useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@peakee/app/state';
import type { AppProps } from 'next/app';

import { initApp } from '../utils/bootstrap';
import { useWrappedDimensions } from '../utils/hooks';

import '../../global.css';

const App = ({ Component, pageProps }: AppProps) => {
	const { height } = useWrappedDimensions();

	useEffect(() => {
		initApp();
	}, []);

	return (
		<Provider store={store}>
			<View style={{ height: height || ('100dvh' as never) }}>
				<Component {...pageProps} />
			</View>
		</Provider>
	);
};

export default App;

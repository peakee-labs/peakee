import { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@peakee/app/state';
import type { AppProps } from 'next/app';

import { initApp } from '../utils/bootstrap';

import '../../global.css';

const App = ({ Component, pageProps }: AppProps) => {
	const { height } = useWrappedWindowDimensions();

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

const useWrappedWindowDimensions = () => {
	const [wrappedWidth, setWrappedWidth] = useState(0);
	const [wrappedHeight, setWrappedHeight] = useState(0);
	const { width, height } = useWindowDimensions();

	useEffect(() => {
		if (window) {
			setWrappedWidth(width);
			setWrappedHeight(height);
		}
	}, []);

	return { width: wrappedWidth, height: wrappedHeight };
};

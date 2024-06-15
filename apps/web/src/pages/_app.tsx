import { View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@peakee/state';
import type { AppProps } from 'next/app';

import '../utils/auth';

import { initApp } from '../utils/bootstrap';
import { useWrappedDimensions } from '../utils/hooks';

import '../../global.css';

initApp();

const App = ({ Component, pageProps }: AppProps) => {
	const { height } = useWrappedDimensions();

	return (
		<Provider store={store()}>
			<View style={{ height: height || ('100dvh' as never) }}>
				<Component {...pageProps} />
			</View>
		</Provider>
	);
};

export default App;

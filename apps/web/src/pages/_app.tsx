import { View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@peakee/state';
import { useWrappedDimensions } from '@peakee/utils/hooks';
import type { AppProps } from 'next/app';

import '@peakee/auth';
import '@peakee/config';

import '../../global.css';

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

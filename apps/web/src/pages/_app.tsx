import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@peakee/app/state';
import type { AppProps } from 'next/app';

import { injectIOC } from '../utils/ioc';

import '../../global.css';

const PeakeeApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		injectIOC();
	}, []);

	return (
		<Provider store={store}>
			<View style={styles.container}>
				<Component {...pageProps} />
			</View>
		</Provider>
	);
};

export default PeakeeApp;

const styles = StyleSheet.create({
	container: {
		minHeight: '100vh' as never,
	},
});

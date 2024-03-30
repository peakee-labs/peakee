import { type FC } from 'react';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '../components/GlobalStyled';
import { darkTheme, lightTheme } from '../config/theme';
import { useThemeMode } from '../utils';

import '../styles/globals.css';

const montserrat = Montserrat({
	subsets: ['latin'],
});

export const App: FC<AppProps> = ({ Component, pageProps }) => {
	const { themeMode } = useThemeMode();

	return (
		<ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
			<GlobalStyles />
			<div className={`${montserrat.className}`}>
				<Component {...pageProps} />
			</div>
		</ThemeProvider>
	);
};

export default App;

import { type FC } from 'react';
import type { AppProps } from 'next/app';
import { Lato } from 'next/font/google';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '../components/GlobalStyled';
import { darkTheme, lightTheme } from '../config/theme';
import { useThemeMode } from '../utils';

import '../styles/globals.css';

import { Box } from '@/components';

const lato = Lato({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
});

export const App: FC<AppProps> = ({ Component, pageProps }) => {
	const { themeMode } = useThemeMode();

	return (
		<ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
			<GlobalStyles />
			<Box className={`${lato.className}`}>
				<Component {...pageProps} />
			</Box>
		</ThemeProvider>
	);
};

export default App;

import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import styled from 'styled-components';

import { Container, HorizontalBox } from '../components';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<Container className={`${inter.className}`}>
			<Head>
				<title>Peakee</title>
			</Head>
			<HeaderContainer>
				<p>Hello</p>
				<p>Hello</p>
			</HeaderContainer>
			<motion.h1
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
			>
				Peakee
			</motion.h1>
		</Container>
	);
}

const HeaderContainer = styled(HorizontalBox)`
	justify-content: space-between;
	height: 48px;
`;

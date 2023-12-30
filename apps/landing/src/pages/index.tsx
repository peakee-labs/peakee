import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import { Container, HorizontalBox } from '../components';
import { headerItems } from '../config/content';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<Container className={`${inter.className}`}>
			<Head>
				<title>Peakee</title>
			</Head>
			<HeaderContainer>
				<h1>Peakee</h1>
				<HeaderItems>
					{headerItems.map(({ link, title }, idx) => {
						return (
							<Link key={idx} href={link} target="_blank">
								<HeaderText>{title}</HeaderText>
							</Link>
						);
					})}
				</HeaderItems>
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
	align-items: center;
	height: 48px;
`;

const HeaderItems = styled(HorizontalBox)`
	gap: 30px;
`;

const HeaderText = styled.p`
	font-size: 14px;
	font-weight: 500;
`;

import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import { Container } from '@/components';
import { Header } from '@/features/HomePage';

export default function Contact() {
	return (
		<Container>
			<Head>
				<title>Peakee | Learn English by Chatting</title>
			</Head>

			<Header />

			<ContentContainer>
				<Link href={'mailto:admin@peakee.co'} target="_blank">
					<h1>admin@peakee.co</h1>
				</Link>
			</ContentContainer>
		</Container>
	);
}

const ContentContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

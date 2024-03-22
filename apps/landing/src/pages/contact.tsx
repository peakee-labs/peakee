import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const montserrat = Montserrat({
	subsets: ['latin'],
});

export default function Contact() {
	return (
		<Container className={`${montserrat.className}`}>
			<Head>
				<title>Peakee | Contact</title>
			</Head>
			<Link href={'mailto:admin@peakee.co'} target="_blank">
				<h1>admin@peakee.co</h1>
			</Link>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

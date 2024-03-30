import Head from 'next/head';

import { Container } from '@/components';
import { Header, MainSection } from '@/features/HomePage';

export default function Home() {
	return (
		<Container>
			<Head>
				<title>Peakee | Learn English by Chatting</title>
			</Head>
			<Header />
			<MainSection />
		</Container>
	);
}

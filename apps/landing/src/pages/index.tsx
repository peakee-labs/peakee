import { Montserrat } from 'next/font/google';
import Head from 'next/head';

import Header from './_index/Header';
import MainSection from './_index/MainSection';
import MethodologySection from './_index/MethodologySection';
import SellingPointsSection from './_index/SellingPointsSection';

import { Container } from '@/components';

const montserrat = Montserrat({
	subsets: ['latin'],
});

export default function Home() {
	return (
		<Container className={`${montserrat.className}`}>
			<Head>
				<title>Peakee | Learn English by Chatting</title>
			</Head>

			<Header />
			<MainSection />
			<MethodologySection />
			<SellingPointsSection />
		</Container>
	);
}

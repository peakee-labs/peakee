import { Fragment } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';

import styles from '../styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<Fragment>
			<Head>
				<title>Peakee</title>
			</Head>
			<main className={`${styles.main} ${inter.className}`}>
				<h1>Peakee</h1>
			</main>
		</Fragment>
	);
}

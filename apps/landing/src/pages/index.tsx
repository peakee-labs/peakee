import Lottie from 'lottie-react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import ChatLottie from '../../public/chat_lottie.json';
import { Box, Container, HorizontalBox } from '../components';
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
			<MainContentBox>
				<TitleBox>
					<BigTitle>Break through</BigTitle>
					<BigTitle>the English barrier</BigTitle>
					<BigTitle>by USING IT</BigTitle>
					<SubTitle>
						Peakee helps you learning English by using it like
						chatting with a rich of AI-powered features
					</SubTitle>
					<HorizontalBox>
						<Button>Web</Button>
						<Button>iOS</Button>
						<Button>Android</Button>
					</HorizontalBox>
				</TitleBox>
				<Box>
					<Lottie animationData={ChatLottie} />
				</Box>
			</MainContentBox>
			<MainContentBox>
				<h1>The best way to learn English is use it!</h1>
			</MainContentBox>
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

const MainContentBox = styled(HorizontalBox)`
	height: calc(100vh - 48px);
	align-items: center;
`;

const TitleBox = styled(Box)`
	gap: 10px;
	max-width: 500px;
`;

const BigTitle = styled.h1`
	font-size: 52px;
	font-weight: 700;
`;

const SubTitle = styled.p`
	font-size: 18px;
	line-height: 1.6;
	margin-top: 20px;
	margin-bottom: 20px;
`;

const Button = styled.button`
	margin-right: 20px;
	min-width: 120px;
	padding-top: 10px;
	padding-bottom: 10px;
`;

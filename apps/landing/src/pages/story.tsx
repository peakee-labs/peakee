import Head from 'next/head';
import styled from 'styled-components';

import { Box, ContentContainer, RootWrapper } from '@/components';
import { devices } from '@/config/responsive';
import { Header } from '@/features/HomePage';

export default function Story() {
	return (
		<Container>
			<Head>
				<title>Peakee | The Story</title>
			</Head>

			<HeaderContainer>
				<Header />
			</HeaderContainer>

			<CustomContentContainer>
				<Title>The story</Title>

				<HeadingContent>
					<Paragraph>Hi there,</Paragraph>
					<Paragraph>
						I am the founder of the Peakee project - using a foreign
						language to learn a foreign language.
					</Paragraph>
				</HeadingContent>

				<MainContent>
					<Paragraph>
						I started seriously learning English by taking a web
						programming course in English on Udemy, and reading a
						1000-page English book about computer networks. At the
						beginning, I could not understand a thing, I translated
						word by word, noted down each vocabulary, each sentence.
						Knowing a few vocabulary words and sentences, I tried to
						hear each sound of each word, read and reread the first
						pages of the book. I successfully built a complete
						website and aced the computer network course without
						attending any classes. I might have given up if it was
						just about learning English, thankfully, what I was
						learning was web programming and computer networking.
					</Paragraph>
					<Paragraph>
						You may be at different ages, on different journeys, but
						as long as you replace the things you are doing, like
						doing, want to do, or need to do with English, you will
						learn English easily. Reading stories in English,
						watching Youtube in English, calling household items in
						English, or any other way that suits you. Try to use
						English as much as possible.
					</Paragraph>
					<Paragraph>
						Peakee will help you use English daily, everywhere, help
						you revise what you have used, and expand your English
						in your own way.
					</Paragraph>
				</MainContent>
				<Footer>
					<Paragraph>Thanks for reading!</Paragraph>
					<Paragraph>Tan Le, Founder of Peakee</Paragraph>
				</Footer>
			</CustomContentContainer>
		</Container>
	);
}

const Title = styled.h1``;

const Container = styled(RootWrapper)`
	display: flex;
	flex-direction: column;
	margin-bottom: 100px;

	@media ${devices.lg} {
		margin-bottom: 0px;
	}
`;

const HeaderContainer = styled(ContentContainer)`
	max-width: 1200px;
`;

const CustomContentContainer = styled(ContentContainer)`
	max-width: 780px;
	margin-top: 28px;
	gap: 28px;
`;

const HeadingContent = styled(Box)`
	gap: 4px;
`;

const MainContent = styled(Box)`
	gap: 24px;
`;

const Footer = styled(Box)`
	gap: 4px;
`;

const Paragraph = styled.p`
	line-height: 1.5;
`;

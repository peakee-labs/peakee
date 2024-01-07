import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';

import { Box, Container, HorizontalBox } from '@/components';

export const MainSection = () => {
	return (
		<Wrapper>
			<MainContainer>
				<TitleBox>
					<BigTitle>Learn English</BigTitle>
					<BigTitle>
						by <Highlight>Chatting</Highlight>
					</BigTitle>
					<SubTitle>
						Peakee helps you learn English by chatting with in-app
						translation, AI suggestions and more
					</SubTitle>
					<HorizontalBox>
						<Button>Web</Button>
						<Button>iOS</Button>
						<Button>Android</Button>
					</HorizontalBox>
				</TitleBox>

				<ImageContainer
					animate={{ opacity: [0, 1], y: [40, 0] }}
					transition={{ duration: 0.4, delay: 0.2 }}
				>
					<Image
						style={{ objectFit: 'contain' }}
						src={'/peakee_app.png'}
						alt="Peakee app"
						layout="fill"
					/>

					<SuggestionBox
						animate={{ opacity: [0, 1], x: [100, 0], y: [50, 0] }}
						transition={{ duration: 0.3, delay: 1 }}
					>
						<Image
							style={{ objectFit: 'contain' }}
							src={'/suggestion.png'}
							alt="Peakee app"
							layout="fill"
						/>
					</SuggestionBox>

					<TranslationBox
						animate={{ opacity: [0, 1], x: [-100, 0], y: [50, 0] }}
						transition={{ duration: 0.3, delay: 1.3 }}
					>
						<Image
							style={{ objectFit: 'contain' }}
							src={'/translation.png'}
							alt="Peakee app"
							layout="fill"
							objectFit="contain"
						/>
					</TranslationBox>
				</ImageContainer>
			</MainContainer>
		</Wrapper>
	);
};

export default MainSection;

const Wrapper = styled(Container)``;

const MainContainer = styled(HorizontalBox)`
	height: calc(100vh - 60px);
`;

const TitleBox = styled(Box)`
	gap: 10px;
	max-width: 500px;
	align-self: center;
`;

const BigTitle = styled.h1`
	font-size: 52px;
	font-weight: 700;
`;

const Highlight = styled.strong`
	font-weight: 900;
	color: #ff7701;
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

const ImageContainer = styled(motion.div)`
	flex: 1;
	position: relative;
	margin-top: 30px;
	margin-bottom: 50px;
`;

const SuggestionBox = styled(motion.div)`
	position: absolute;
	width: 300px;
	height: 150px;
	bottom: 100px;
	left: 0px;
`;

const TranslationBox = styled(motion.div)`
	position: absolute;
	width: 300px;
	height: 300px;
	bottom: 180px;
	right: -20px;
`;

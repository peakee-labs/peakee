import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';

import {
	Box,
	Container,
	HorizontalBox,
	PrimaryButton,
	SecondaryButton,
} from '@/components';
import { devices } from '@/config/responsive';

export const MainSection = () => {
	const launchApp = () => {
		window.open('https://app.peakee.co', '_blank', 'noopener,noreferrer');
	};

	const joinWaitlist = () => {
		window.open('https://app.peakee.co', '_blank', 'noopener,noreferrer');
	};

	return (
		<Wrapper>
			<MainContainer>
				<TitleBox>
					<BigTitle>Learn English</BigTitle>
					<BigTitle>
						by <Highlight>Chatting</Highlight>
					</BigTitle>
					<SubTitle>
						Peakee helps you to chat in English by supporting AI
						suggestions, in-app translation and more...
					</SubTitle>
					<ButtonsBox>
						<PrimaryButton title="Launch App" onClick={launchApp} />
						<SecondaryButton
							title="Join waitlist"
							onClick={joinWaitlist}
						/>
					</ButtonsBox>
				</TitleBox>

				<ImageContainer
					animate={{ opacity: [0, 1], y: [40, 0] }}
					transition={{ duration: 0.4, delay: 0.2 }}
				>
					<ContainedImage fill src={'/peakee_app.png'} alt="" />

					<SuggestionBox
						animate={{ opacity: [0, 1], x: [100, 0], y: [50, 0] }}
						transition={{ duration: 0.3, delay: 1 }}
					>
						<ContainedImage fill src={'/suggestion.png'} alt="" />
					</SuggestionBox>

					<TranslationBox
						animate={{ opacity: [0, 1], x: [-100, 0], y: [50, 0] }}
						transition={{ duration: 0.3, delay: 1.3 }}
					>
						<ContainedImage fill src={'/translation.png'} alt="" />
					</TranslationBox>
				</ImageContainer>
			</MainContainer>
		</Wrapper>
	);
};

export default MainSection;

const Wrapper = styled(Container)``;

const MainContainer = styled(Box)`
	height: calc(200vh - 60px);

	@media ${devices.lg} {
		flex-direction: row;
		height: calc(100vh - 60px);
	}
`;

const TitleBox = styled(Box)`
	gap: 10px;
	max-width: 500px;
	align-self: center;
	justify-content: center;
	min-height: 600px;
`;

const BigTitle = styled.h1`
	font-size: 52px;
	font-weight: 700;
	text-align: center;

	@media ${devices.md} {
		text-align: left;
	}
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
	text-align: center;

	@media ${devices.md} {
		text-align: left;
	}
`;

const ButtonsBox = styled(HorizontalBox)`
	gap: 10px;
	justify-content: center;

	@media ${devices.md} {
		justify-content: flex-start;
	}
`;

const ImageContainer = styled(motion.div)`
	flex: 1;
	position: relative;
	margin-top: 30px;
	margin-bottom: 50px;
	max-height: 800px;
	margin-left: 80px;
	margin-right: 80px;
`;

const ContainedImage = styled(Image)`
	object-fit: contain;
`;

const SuggestionBox = styled(motion.div)`
	position: absolute;
	width: 250px;
	height: 125px;
	top: 100px;
	left: -60px;

	@media ${devices.lg} {
		left: -40px;
		top: 70px;
		width: 300px;
		height: 150px;
	}
`;

const TranslationBox = styled(motion.div)`
	position: absolute;
	width: 270px;
	height: 270px;
	bottom: 110px;
	right: -60px;

	@media ${devices.lg} {
		width: 300px;
		height: 300px;
		bottom: 30px;
		right: -60px;
	}
`;

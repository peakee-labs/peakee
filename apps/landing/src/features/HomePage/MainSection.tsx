import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import {
	Box,
	HorizontalBox,
	PrimaryButton,
	SecondaryButton,
} from '@/components';
import { devices } from '@/config/responsive';

export const MainSection = () => {
	// const launchApp = () => {
	// 	window.open('https://app.peakee.co', '_blank', 'noopener,noreferrer');
	// };
	const navigate = useRouter();

	const downloadChromeExtension = () => {
		window.open(
			'/peakee-ext-0.0.7-production.zip',
			'_blank',
			'noopener,noreferrer',
		);

		setTimeout(() => {
			navigate.push('/guides');
		}, 1500);
	};

	const joinWaitlist = () => {
		window.open(
			'https://forms.gle/d6DU1YKV6NjJkr9h9',
			'_blank',
			'noopener,noreferrer',
		);
	};

	return (
		<Container>
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
					<PrimaryButton
						title="Download Chrome Extension"
						onClick={downloadChromeExtension}
					/>
					{/* <PrimaryButton title="Launch App" onClick={launchApp} /> */}
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
		</Container>
	);
};

export default MainSection;

const Container = styled(Box)`
	height: 140vh;
	max-height: 1524px;

	@media ${devices.lg} {
		flex-direction: row;
		max-height: 1024px;
		height: calc(100vh - 60px);
	}
`;

const TitleBox = styled(Box)`
	gap: 10px;
	max-width: 500px;
	align-self: center;
	justify-content: center;
	min-height: 500px;
`;

const BigTitle = styled.h1`
	font-size: 42px;
	font-weight: 700;
	text-align: center;

	@media ${devices.sm} {
		font-size: 52px;
	}

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
	height: 94%;
	max-height: 800px;
	margin-top: auto;
	margin-bottom: auto;
	margin-left: 20px;
	margin-right: 20px;

	@media ${devices.ss} {
		margin-left: 40px;
		margin-right: 40px;
	}

	@media ${devices.md} {
		margin-left: 20px;
		margin-right: 20px;
	}
`;

const ContainedImage = styled(Image)`
	object-fit: contain;
`;

const SuggestionBox = styled(motion.div)`
	position: absolute;
	width: 200px;
	height: 100px;
	top: 96px;
	left: -20px;

	@media ${devices.sm} {
		left: 0px;
		top: 70px;
		width: 300px;
		height: 150px;
	}
`;

const TranslationBox = styled(motion.div)`
	position: absolute;
	width: 200px;
	height: 200px;
	bottom: 90px;
	right: -20px;

	@media ${devices.sm} {
		width: 300px;
		height: 300px;
		bottom: 30px;
		right: 0px;
	}
`;

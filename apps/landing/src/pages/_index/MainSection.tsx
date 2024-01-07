import Lottie from 'lottie-react';
import styled from 'styled-components';

import ChatLottie from '@/assets/chat_lottie.json';
import { Box, HorizontalBox } from '@/components';

export const MainSection = () => {
	return (
		<Container>
			<TitleBox>
				<BigTitle>Learn English</BigTitle>
				<BigTitle>by CHATTING</BigTitle>
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
			<Box>
				<Lottie animationData={ChatLottie} />
			</Box>
		</Container>
	);
};

export default MainSection;

const Container = styled(HorizontalBox)`
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

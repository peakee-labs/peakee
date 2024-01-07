import styled from 'styled-components';

import { Box } from '@/components';

export const ExplainSection = () => {
	return (
		<Container>
			<Title>
				We help people <BlueHighlight>use</BlueHighlight> English
			</Title>
		</Container>
	);
};

export default ExplainSection;

const Container = styled(Box)`
	height: 100vh;
	align-items: center;
`;

const Title = styled.h2`
	margin-top: 100px;
	font-size: 52px;
	font-weight: 400;
`;

const BlueHighlight = styled.strong`
	color: #5f4dff;
`;

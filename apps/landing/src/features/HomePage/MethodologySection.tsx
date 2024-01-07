import styled from 'styled-components';

import { Box } from '@/components';

export const MethodologySection = () => {
	return (
		<Container>
			<Title>
				People learn English, but they{' '}
				<RedHighlight>{"don't use"}</RedHighlight> it!
			</Title>
		</Container>
	);
};

export default MethodologySection;

const Container = styled(Box)`
	height: 100vh;
	align-items: center;
`;

const Title = styled.h2`
	margin-top: 100px;
	font-size: 52px;
	font-weight: 400;
`;

const RedHighlight = styled.strong`
	color: #e15869;
`;

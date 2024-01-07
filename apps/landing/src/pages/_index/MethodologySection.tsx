import styled from 'styled-components';

import { Box } from '@/components';

export const MethodologySection = () => {
	return (
		<Container>
			<h1>Methodology</h1>
			<p>{"People learn English, but they don't use it!"}</p>
			<p>{'Peakee helps people use English'}</p>
		</Container>
	);
};

export default MethodologySection;

const Container = styled(Box)`
	height: 100vh;
`;

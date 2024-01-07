import styled from 'styled-components';

import { Box } from '@/components';

export const SellingPointsSection = () => {
	return (
		<Container>
			<h1>The best way to learn English is use it!</h1>
			<p>Use to learn</p>
			<p>Connect learners</p>
			<p>Practice on usage</p>
		</Container>
	);
};

export default SellingPointsSection;

const Container = styled(Box)`
	height: 100vh;
`;

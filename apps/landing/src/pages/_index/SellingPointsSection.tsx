import styled from 'styled-components';

import { Container } from '@/components';

export const SellingPointsSection = () => {
	return (
		<Wrapper>
			<h1>The best way to learn English is use it!</h1>
			{/* <p>Use to learn</p>
			<p>Connect learners</p>
			<p>Practice on usage</p> */}
		</Wrapper>
	);
};

export default SellingPointsSection;

const Wrapper = styled(Container)`
	height: 100vh;
`;

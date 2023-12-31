import type { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
	className?: string;
	children: ReactNode;
};

export const Container: FC<Props> = ({ className, children }) => {
	return (
		<Wrapper className={className}>
			<ContentContainer>{children}</ContentContainer>
		</Wrapper>
	);
};

export default Container;

const Wrapper = styled.div`
	max-width: 1280px;
	margin-left: auto;
	margin-right: auto;
	padding-left: 32px;
	padding-right: 32px;
`;

const ContentContainer = styled.div`
	width: 100%;
`;

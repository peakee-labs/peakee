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
	width: 100%;
`;

const ContentContainer = styled.div`
	max-width: 1280px;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	padding-left: 14px;
	padding-right: 14px;
`;

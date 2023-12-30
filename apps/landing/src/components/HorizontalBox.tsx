import type { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
	className?: string;
	children: ReactNode;
};

export const HorizontalBox: FC<Props> = ({ className, children }) => {
	return <Container className={className}>{children}</Container>;
};

export default HorizontalBox;

const Container = styled.div`
	display: flex;
	flex-direction: row;
`;

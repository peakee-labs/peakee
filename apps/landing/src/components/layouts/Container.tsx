import type { FC, ReactNode } from 'react';
import styled from 'styled-components';

import Box from '../Box';

type Props = {
	className?: string;
	children: ReactNode;
};

export const Container: FC<Props> = ({ className, children }) => {
	return (
		<RootWrapper className={className}>
			<ContentContainer>{children}</ContentContainer>
		</RootWrapper>
	);
};

export default Container;

export const RootWrapper = styled(Box)`
	width: 100%;
`;

export const ContentContainer = styled(Box)`
	max-width: 1280px;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	padding-left: 14px;
	padding-right: 14px;
`;

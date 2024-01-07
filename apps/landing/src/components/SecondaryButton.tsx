import type { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
	title?: string;
	children?: ReactNode;
	onClick?: () => void;
};

export const SecondaryButton: FC<Props> = ({ title, children, onClick }) => {
	return (
		<ButtonContainer onClick={onClick}>{title || children}</ButtonContainer>
	);
};

export default SecondaryButton;

const ButtonContainer = styled.button`
	border: none;
	padding: 12px 24px 12px 24px;
	border-radius: 14px;
	border: 1px solid #3c3c3c;
	background-color: transparent;
	color: #3c3c3c;
	font-size: 16px;
	&:hover {
		cursor: pointer;
		opacity: 0.86;
	}
`;

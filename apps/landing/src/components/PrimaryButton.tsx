import type { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
	title?: string;
	children?: ReactNode;
	onClick?: () => void;
	className?: string;
};

export const PrimaryButton: FC<Props> = ({
	title,
	children,
	onClick,
	className,
}) => {
	return (
		<ButtonContainer className={className} onClick={onClick}>
			{title || children}
		</ButtonContainer>
	);
};

export default PrimaryButton;

const ButtonContainer = styled.button`
	border: none;
	padding: 12px 24px 12px 24px;
	border-radius: 14px;
	background-color: #ff7701;
	color: #ffffff;
	font-size: 14px;
	&:hover {
		cursor: pointer;
		opacity: 0.86;
	}
`;

import Link from 'next/link';
import styled from 'styled-components';

import { HorizontalBox } from '@/components';
import { headerItems } from '@/config/content';

export const Header = () => {
	return (
		<HeaderContainer>
			<AppName>Peakee</AppName>
			<HeaderItems>
				{headerItems.map(({ link, title }, idx) => {
					return (
						<Link key={idx} href={link} target="_blank">
							<HeaderText>{title}</HeaderText>
						</Link>
					);
				})}
			</HeaderItems>
		</HeaderContainer>
	);
};

export default Header;

const HeaderContainer = styled(HorizontalBox)`
	justify-content: space-between;
	align-items: center;
	height: 48px;
`;

const AppName = styled.h1`
	font-size: 20px;
`;

const HeaderItems = styled(HorizontalBox)`
	gap: 30px;
`;

const HeaderText = styled.p`
	font-size: 14px;
`;

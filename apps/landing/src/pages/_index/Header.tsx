import Link from 'next/link';
import styled from 'styled-components';

import { Container, HorizontalBox, PrimaryButton } from '@/components';
import { headerItems } from '@/config/content';

export const Header = () => {
	const launchApp = () => {
		window.open('https://app.peakee.co', '_blank', 'noopener,noreferrer');
	};

	return (
		<Wrapper>
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

					<PrimaryButton title="Launch App" onClick={launchApp} />
				</HeaderItems>
			</HeaderContainer>
		</Wrapper>
	);
};

export default Header;

const Wrapper = styled(Container)``;

const HeaderContainer = styled(HorizontalBox)`
	justify-content: space-between;
	align-items: center;
	height: 60px;
`;

const AppName = styled.h1`
	font-size: 20px;
`;

const HeaderItems = styled(HorizontalBox)`
	gap: 30px;
	align-items: center;
`;

const HeaderText = styled.p`
	font-size: 14px;
`;

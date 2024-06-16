import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { HorizontalBox, PrimaryButton } from '@/components';
import BurgerIcon from '@/components/icons/BurgerIcon';
import { headerItems } from '@/config/content';
import { devices } from '@/config/responsive';

export const Header = () => {
	// const launchApp = () => {
	// 	window.open('https://app.peakee.co', '_blank', 'noopener,noreferrer');
	// };
	const navigate = useRouter();

	const downloadChromeExtension = () => {
		window.open(
			'/peakee-ext-0.0.7-production.zip',
			'_blank',
			'noopener,noreferrer',
		);

		setTimeout(() => {
			navigate.push('/guides');
		}, 1500);
	};

	return (
		<Container>
			<Link href={'/'}>
				<AppName>Peakee</AppName>
			</Link>

			<MenuButton>
				<BurgerIcon />
			</MenuButton>

			<HeaderItems>
				{headerItems.map(({ link, title }, idx) => {
					return (
						<Link key={idx} href={link}>
							<HeaderText>{title}</HeaderText>
						</Link>
					);
				})}

				<PrimaryButton
					title="Download Chrome Extension"
					onClick={downloadChromeExtension}
				/>
			</HeaderItems>
		</Container>
	);
};

export default Header;

const Container = styled(HorizontalBox)`
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

	display: none;

	@media ${devices.md} {
		display: flex;
	}
`;

const MenuButton = styled.div`
	@media ${devices.md} {
		display: none;
	}
`;

const HeaderText = styled.p`
	font-size: 14px;
`;

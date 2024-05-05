import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

import { Container, ContentContainer } from '@/components';
import Header from '@/features/HomePage/Header';

export default function Guides() {
	return (
		<Container>
			<Head>
				<title>Peakee | Chrome Extension Guides</title>
			</Head>
			<Header />

			<CustomContentContainer>
				<Title>Install the Extension</Title>

				<ItemTitle>
					1. After clicking the download button, a Zip file will be
					downloaded
				</ItemTitle>
				<ItemTitle>
					2. Go to Download, open and unzip the Zip file
				</ItemTitle>

				<ItemTitle>3. Open Manage Chrome Extensions</ItemTitle>
				<Image
					src="/guides/install-chrome-extension/open_manage_extensions.png"
					alt=""
					width={300}
					height={380}
					objectFit="contain"
				></Image>

				<ItemTitle>4. Enable developer mode</ItemTitle>
				<Image
					src="/guides/install-chrome-extension/enable_developer_mode.png"
					alt=""
					width={400}
					height={120}
					objectFit="contain"
				></Image>

				<ItemTitle>
					5. Load extension, pick the folder you downloaded
				</ItemTitle>
				<Image
					src="/guides/install-chrome-extension/load_extension.png"
					alt=""
					width={400}
					height={150}
					objectFit="contain"
				></Image>

				<ItemTitle>5. Pin the extension to use later</ItemTitle>
				<Image
					src="/guides/install-chrome-extension/pin_extension.png"
					alt=""
					width={400}
					height={260}
					objectFit="contain"
				></Image>

				<Title>How to use the Peakee Extension</Title>

				<ItemTitle>
					Open by the pinned icon, and translate anything
				</ItemTitle>
				<Image
					src="/guides/use-chrome-extension/popup_translate.png"
					alt=""
					width={500}
					height={400}
					objectFit="contain"
				></Image>

				<ItemTitle>
					Open any tab, select the text to translate or explain
				</ItemTitle>
				<Image
					src="/guides/use-chrome-extension/select_action.png"
					alt=""
					width={500}
					height={220}
					objectFit="contain"
				></Image>

				<ItemTitle>
					Click translate {'->'} open a translate box
				</ItemTitle>
				<Image
					src="/guides/use-chrome-extension/select_translate.png"
					alt=""
					width={500}
					height={320}
					objectFit="contain"
				></Image>

				<ItemTitle>Click explain {'->'} open an explain box</ItemTitle>
				<Image
					src="/guides/use-chrome-extension/select_explain.png"
					alt=""
					width={500}
					height={300}
					objectFit="contain"
				></Image>

				<ItemTitle>
					And review the last explanation when opening a new tab
				</ItemTitle>
				<Image
					src="/guides/use-chrome-extension/newtab_review.png"
					alt=""
					width={500}
					height={400}
					objectFit="contain"
				></Image>
			</CustomContentContainer>
		</Container>
	);
}

const Title = styled.h1`
	margin-top: 20px;
	margin-bottom: 10px;
`;

const ItemTitle = styled.p`
	margin-top: 16px;
	margin-bottom: 6px;
`;

const CustomContentContainer = styled(ContentContainer)`
	max-width: 780px;
	margin-top: 28px;
`;

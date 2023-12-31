import type { DocumentContext } from 'next/document';
import Doc, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export const Document = () => {
	return (
		<Html lang="en">
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;

Document.getInitialProps = async (ctx: DocumentContext) => {
	const sheet = new ServerStyleSheet();
	const originalRenderPage = ctx.renderPage;

	try {
		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App) => (props) =>
					sheet.collectStyles(<App {...props} />),
			});

		const initialProps = await Doc.getInitialProps(ctx);
		return {
			...initialProps,
			styles: [initialProps.styles, sheet.getStyleElement()],
		};
	} finally {
		sheet.seal();
	}
};

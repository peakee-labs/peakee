const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const { DefinePlugin } = require('webpack');

const ParseEnvironmentPlugin = () => {
	const environments = [
		// for initializing firebase auth
		'APP_ID',
		'API_KEY',
		'AUTH_DOMAIN',
		'PROJECT_ID',
		'STORAGE_BUCKET',
		'MESSAGING_SENDER_ID',
		'MEASUREMENT_ID',
		// for launchWebOauth with chrome.identity api
		'WEB_OAUTH_CLIENT_ID',
		// for integrating app services
		'PEAKEE_WS_URL',
		'PEAKEE_API_URL',
		'BLINDERS_EXPLORE_URL',
	].reduce((acc, cur) => {
		acc[cur] = JSON.stringify(process.env[cur]);
		return acc;
	}, {});

	return new DefinePlugin({
		__DEV__: process.env.NODE_ENV !== 'production' || true,
		process: { env: {} },
		...environments,
	});
};

const CreateManifestFilesPlugin = () => {
	return new CopyWebpackPlugin({
		patterns: [
			{
				from: 'src/manifest.json',
				force: true,
				transform: function (content) {
					return Buffer.from(
						JSON.stringify({
							...JSON.parse(content.toString()),
							version: process.env.npm_package_version,
							key: process.env.EXTENSION_PUBLIC_KEY,
						}),
					);
				},
			},
			{ from: 'src/rules.json' },
		],
	});
};

const PrepareAssetsPlugin = () => {
	return new CopyWebpackPlugin({
		patterns: [{ from: 'assets/images/', force: true }],
	});
};

const InjectPDFJsPlugins = () => {
	const pdfjsContentPath = path.join(
		__dirname,
		'../../../vendor/pdf.js/build/chromium/content',
	);

	const copyPDFJSContent = new CopyWebpackPlugin({
		patterns: [
			{
				from: pdfjsContentPath,
				to: 'content',
				globOptions: { ignore: '**/web/viewer.html' },
			},
		],
	});

	const PDFViewerHTMLPath = path.join(pdfjsContentPath, 'web/viewer.html');

	const copyPDFViewerHTML = new CopyWebpackPlugin({
		patterns: [
			{
				from: PDFViewerHTMLPath,
				to: 'content/web/viewer.html',
				transform: function (content) {
					let contentStr = content.toString();
					contentStr = contentStr.replace(
						'</head>',
						'<script defer src="../../contentScript.bundle.js"></script></head>',
					);
					return Buffer.from(contentStr);
				},
			},
		],
	});

	return [copyPDFJSContent, copyPDFViewerHTML];
};

/**
 * @param {"production" | "development"} mode
 * @param {string} version
 */
const ZipExtBundlePlugin = (mode, version) => {
	return new ZipPlugin({
		filename: `peakee-v${version}-${mode}.zip`,
		path: path.join(__dirname, '../builds/ext-zip'),
	});
};

module.exports = {
	ParseEnvironmentPlugin,
	CreateManifestFilesPlugin,
	PrepareAssetsPlugin,
	InjectPDFJsPlugins,
	ZipExtBundlePlugin,
};

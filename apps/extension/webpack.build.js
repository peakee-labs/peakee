const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
	getModeFromFlag,
	loadEnvWithEnvFileFlag,
} = require('../../tools/bundler');

const webpack = require('webpack');
const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');

loadEnvWithEnvFileFlag();

const mode = getModeFromFlag() || 'development';
console.log('Building mode:', mode);

process.env.BABEL_ENV = mode;
process.env.NODE_ENV = mode;
process.env.ASSET_PATH = '/';

const config = require('./webpack.config');
config.mode = mode;

const packageInfo = require('./package.json');
console.log('Building version:', packageInfo.version);

if (mode === 'production') {
	console.log('Optimization with TerserPlugin');
	config.optimization = {
		minimize: true,
		minimizer: [new TerserPlugin()],
	};
}

// const pdfjsExtensionPath = path.join(
// 	__dirname,
// 	'../../../vendor/pdf.js/build/chromium',
// );
// const copyPDFJS = new CopyWebpackPlugin({
// 	patterns: [
// 		{
// 			from: pdfjsExtensionPath,
// 			to: 'pdfjs',
// 			globOptions: { ignore: '**/manifest.json' },
// 		},
// 	],
// });

const pdfjsContentPath = path.join(
	__dirname,
	'../../vendor/pdf.js/build/chromium/content',
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

const zipBundle = new ZipPlugin({
	filename: `peakee-ext-${packageInfo.version}-${mode}.zip`,
	path: path.join(__dirname, './build/ext-zip'),
});

config.plugins.push(copyPDFJSContent, copyPDFViewerHTML, zipBundle);

config.module.rules.push({
	test: /\.(js|jsx|ts|tsx)$/,
	loader: 'string-replace-loader',
	options: {
		multiple: [
			{
				search: /https?:\/\/(?!.*redux)[^\s"]+\.js/,
				replace: '',
				flags: 'g',
			},
			{
				search: 'https://www.google.com/recaptcha/api.js',
				replace: '',
				flags: 'g',
			},
		],
	},
});

webpack(config, function (err) {
	console.log('Build complete.');
	if (err) throw err;
});

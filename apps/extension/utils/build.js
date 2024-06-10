const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
	getModeFromFlag,
	loadEnvWithEnvFileFlag,
} = require('../../../tools/bundler');

loadEnvWithEnvFileFlag();

const mode = getModeFromFlag() || 'development';

console.log('Building mode:', mode);

process.env.BABEL_ENV = mode;
process.env.NODE_ENV = mode;
process.env.ASSET_PATH = '/';

const webpack = require('webpack');
const path = require('path');
const config = require('../webpack.config');
const ZipPlugin = require('zip-webpack-plugin');

config.mode = mode;

const packageInfo = require('../package.json');

console.log('Building version:', packageInfo.version);

const pdfjsExtensionPath = path.join(
	__dirname,
	'../../../vendor/pdf.js/build/chromium',
);
const copyPDFJS = new CopyWebpackPlugin({
	patterns: [{ from: pdfjsExtensionPath, to: 'pdfjs' }],
});

const pdfjsContentPath = path.join(
	__dirname,
	'../../../vendor/pdf.js/build/chromium/content',
);

const copyPDFJSContent = new CopyWebpackPlugin({
	patterns: [{ from: pdfjsContentPath, to: 'content' }],
});

const zipBundle = new ZipPlugin({
	filename: `peakee-ext-${packageInfo.version}-${mode}.zip`,
	path: path.join(__dirname, '../build/ext-zip'),
});

config.plugins.push(copyPDFJS, copyPDFJSContent, zipBundle);

webpack(config, function (err) {
	console.log('Build complete.');
	if (err) throw err;
});

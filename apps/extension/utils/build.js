process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

const webpack = require('webpack');
const path = require('path');
const config = require('../webpack.config');
const ZipPlugin = require('zip-webpack-plugin');

config.mode = 'production';

const packageInfo = require('../package.json');

console.log('Building version:', packageInfo.version);

config.plugins.push(
	new ZipPlugin({
		filename: `peakee-ext-${packageInfo.version}.zip`,
		path: path.join(__dirname, '../build/ext-zip'),
	}),
);

webpack(config, function (err) {
	console.log('Build complete.');
	if (err) throw err;
});

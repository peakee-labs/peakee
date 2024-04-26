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
// const path = require('path');
const configs = require('../webpack.config');
// const ZipPlugin = require('zip-webpack-plugin');

configs[0].mode = mode;
configs[1].mode = mode;

const packageInfo = require('../package.json');

console.log('Building version:', packageInfo.version);

// configs[configs.length - 1].plugins.push(
// 	new ZipPlugin({
// 		filename: `peakee-ext-${packageInfo.version}-{mode}.zip`,
// 		path: path.join(__dirname, '../build/ext-zip'),
// 	}),
// );

webpack(configs, function (err) {
	console.log('Build complete.');
	if (err) throw err;
});

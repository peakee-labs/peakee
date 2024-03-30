const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

const config = require('../webpack.config');
const env = require('./env');

for (var entryName in config.entry) {
	config.entry[entryName] = [
		'webpack/hot/dev-server',
		`webpack-dev-server/client?hot=true&hostname=localhost&port=${env.PORT}`,
	].concat(config.entry[entryName]);
}

config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.output = {
	filename: '[name].bundle.js',
	path: path.resolve(__dirname, 'build/dev'),
	clean: true,
};

const compiler = webpack(config);

const server = new WebpackDevServer(
	{
		hot: true,
		liveReload: true,
		client: { webSocketTransport: 'ws' },
		webSocketServer: 'ws',
		host: 'localhost',
		port: env.PORT,
		static: {
			directory: path.join(__dirname, '../assets'),
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		allowedHosts: 'all',
	},
	compiler,
);

(async () => {
	await server.start();
})();

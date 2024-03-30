const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = require('../webpack.config');
const env = require('./env');

for (var entryName in config.entry) {
	config.entry[entryName] = [
		'webpack/hot/dev-server',
		`webpack-dev-server/client?hot=true&hostname=localhost&port=${env.PORT}`,
	].concat(config.entry[entryName]);
}

config.plugins.push(
	new ReactRefreshPlugin(),
	new webpack.HotModuleReplacementPlugin(),
);

config.output = {
	filename: '[name].bundle.js',
	path: path.resolve(__dirname, 'build/dev'),
	clean: true,
};

config.entry['index'] = './src/index.jsx';
config.plugins.push(
	new HtmlWebpackPlugin({
		template: './src/index.html',
		filename: 'index.html',
		chunks: ['index'],
	}),
);

const compiler = webpack(config);

const server = new WebpackDevServer(
	{
		hot: true,
		liveReload: false,
		client: { webSocketTransport: 'ws' },
		webSocketServer: 'ws',
		host: 'localhost',
		port: env.PORT,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		allowedHosts: 'all',
		historyApiFallback: true,
	},
	compiler,
);

(async () => {
	await server.start();
})();

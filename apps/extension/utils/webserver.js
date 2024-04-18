const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = require('../webpack.config');
const env = require('./env');

config.output = {
	filename: '[name].bundle.js',
	path: path.resolve(__dirname, 'build/dev'),
	clean: true,
};

config.entry['index'] = './src/index.tsx';

config.plugins.push(
	new HtmlWebpackPlugin({
		template: './src/index.html',
		filename: 'index.html',
		chunks: ['index', 'contentScript', 'background'],
	}),
);

config.optimization = {
	/*
        The value 'single' instead creates a runtime file to be shared for all generated chunks.
        https://github.com/webpack/webpack-dev-server/issues/2792
      */
	runtimeChunk: 'single',
};

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

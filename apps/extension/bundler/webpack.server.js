const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProgressPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { AssetsRules, StyleHtmlRules, BabelJSRule } = require('./rules');
const { ParseEnvironmentPlugin } = require('./plugins');
const { ResolveFileExtensions, ResolveNodeModules } = require('./resolve');

const {
	loadEnvWithEnvFileFlag,
	getPortFromFlag,
} = require('../../../tools/bundler');

loadEnvWithEnvFileFlag();

const port = getPortFromFlag() || '3000';

/** @type { import('webpack').Configuration } */
const config = {
	mode: process.env.NODE_ENV || 'development',
	target: 'web',
	entry: {
		index: [
			'webpack/hot/dev-server',
			`webpack-dev-server/client?hot=true&hostname=localhost&port=${port}`,
			'./src/dev/index.tsx',
		],
	},
	// output: {
	// 	filename: '[name].bundle.js',
	// 	path: path.resolve(__dirname, 'build/dev'),
	// 	clean: true,
	// },
	optimization: {
		/*
        The value 'single' instead creates a runtime file to be shared for all generated chunks.
        https://github.com/webpack/webpack-dev-server/issues/2792
      */
		runtimeChunk: 'single',
	},
	module: {
		rules: [...AssetsRules(), ...StyleHtmlRules(), BabelJSRule()],
	},
	resolve: {
		extensions: ResolveFileExtensions('web'),
		modules: ResolveNodeModules(),
	},
	plugins: [
		new ReactRefreshPlugin(),
		new CleanWebpackPlugin(),
		new ProgressPlugin(),
		ParseEnvironmentPlugin(),
		new HtmlWebpackPlugin({
			template: './src/dev/index.html',
			filename: 'index.html',
			chunks: ['index'],
		}),
	],
};

const server = new WebpackDevServer(
	{
		hot: true,
		liveReload: false,
		client: { webSocketTransport: 'ws' },
		webSocketServer: 'ws',
		host: 'localhost',
		port: port,
		headers: { 'Access-Control-Allow-Origin': '*' },
		allowedHosts: 'all',
		historyApiFallback: true,
	},
	webpack(config),
);

(async () => {
	await server.start();
})();

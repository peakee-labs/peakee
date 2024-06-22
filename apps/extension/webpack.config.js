const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const imageFileExtensions = ['jpg', 'jpeg', 'png', 'svg'];
const fontFileExtensions = ['ttf'];

const internalPackages = [
	'api',
	'auth',
	'config',
	'features',
	'icons',
	'logger',
	'state',
	'types',
	'ui',
	'utils',
];

const resolvedInternalPackages = internalPackages.map((p) => {
	return path.resolve(__dirname, '../../packages', p);
});

const transpilePackages = [
	'react',
	'react-native',
	'react-redux',
	'react-native-svg',
	'react-native-reanimated',
	'react-native-gesture-handler',
	'@gorhom/bottom-sheet',
	'@metacraft/crab',
];

const resolvedTranspilePackages = transpilePackages.map((p) => {
	const localPackagePath = path.resolve(__dirname, './node_modules', p);
	if (fs.existsSync(localPackagePath)) {
		return path.resolve(__dirname, 'node_modules', p);
	} else {
		return path.resolve(__dirname, '../../node_modules', p);
	}
});

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

/** @type { import('webpack').Configuration } */
const configs = {
	mode: process.env.NODE_ENV || 'development',
	target: 'web',
	devtool: 'cheap-module-source-map',
	entry: {
		popup: './src/entries/popup/index.tsx',
		background: './src/entries/background/index.ts',
		contentScript: './src/entries/contentScript/index.tsx',
		// newtab: './src/entries/newtab/index.tsx',
		// options: './src/entries/options/index.tsx',
		// devtools: './src/entries/devtools/index.ts',
		// panel: './src/entries/panel/index.tsx',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build/ext'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: new RegExp('.(' + fontFileExtensions.join('|') + ')$'),
				type: 'asset/inline',
			},
			{
				test: new RegExp('.(' + imageFileExtensions.join('|') + ')$'),
				type: 'asset/resource',
				loader: 'file-loader',
				options: { name: '[name].[ext]' },
			},
			{ test: /\.html$/, loader: 'html-loader' },
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: [
					path.resolve(
						__dirname,
						'../../node_modules/react-redux/node_modules/@babel',
					),
				],
				include: [
					...resolvedTranspilePackages,
					...resolvedInternalPackages,
					path.resolve(__dirname, 'src'),
				],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['module:metro-react-native-babel-preset'],
							plugins: ['react-native-web'],
						},
					},
				],
			},
		],
	},
	resolve: {
		alias: {
			'react-native$': 'react-native-web',
		},
		extensions: [...imageFileExtensions, ...fontFileExtensions]
			.map((extension) => '.' + extension)
			.concat([
				'.ext.js',
				'.ext.jsx',
				'.ext.ts',
				'.ext.tsx',
				'.web.js',
				'.web.jsx',
				'.web.ts',
				'.web.tsx',
				'.js',
				'.jsx',
				'.ts',
				'.tsx',
			]),
		modules: [
			// resolve local node_modules first
			path.resolve(__dirname, 'node_modules'),
			'node_modules',
		],
	},
	plugins: [
		new CleanWebpackPlugin({ verbose: true }),
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({
			__DEV__: process.env.NODE_ENV !== 'production' || true,
			process: { env: {} },
			...environments,
		}),
		new CopyWebpackPlugin({
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
				{ from: 'assets/images/', force: true },
			],
		}),
		// new HtmlWebpackPlugin({
		// 	template: './src/entries/newtab/index.html',
		// 	filename: 'newtab.html',
		// 	chunks: ['newtab', 'contentScript'],
		// }),
		// new HtmlWebpackPlugin({
		// 	template: './src/entries/options/index.html',
		// 	filename: 'options.html',
		// 	chunks: ['options'],
		// }),
		new HtmlWebpackPlugin({
			template: './src/entries/popup/index.html',
			filename: 'popup.html',
			chunks: ['popup'],
		}),
		// new HtmlWebpackPlugin({
		// 	template: './src/entries/devtools/index.html',
		// 	filename: 'devtools.html',
		// 	chunks: ['devtools'],
		// }),
		// new HtmlWebpackPlugin({
		// 	template: './src/entries/panel/index.html',
		// 	filename: 'panel.html',
		// 	chunks: ['panel'],
		// }),
	],
};

module.exports = configs;

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const assetFileExtensions = ['jpg', 'jpeg', 'png', 'svg', 'ttf'];

const internalPackages = ['ui', 'icons', 'app'];

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
];

const resolvedTranspilePackages = transpilePackages.map((p) => {
	return path.resolve(__dirname, '../../node_modules', p);
});

const environments = [
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
	entry: {
		newtab: './src/newtab/index.jsx',
		options: './src/options/index.jsx',
		popup: './src/popup/index.jsx',
		background: './src/background/index.js',
		contentScript: './src/contentScript/index.js',
		devtools: './src/devtools/index.js',
		panel: './src/panel/index.jsx',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: new RegExp('.(' + assetFileExtensions.join('|') + ')$'),
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
		extensions: assetFileExtensions
			.map((extension) => '.' + extension)
			.concat([
				'.web.js',
				'.web.jsx',
				'.web.ts',
				'.web.tsx',
				'.js',
				'.jsx',
				'.ts',
				'.tsx',
			]),
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
								version: process.env.npm_package_version,
								...JSON.parse(content.toString()),
							}),
						);
					},
				},
				{ from: 'assets/img/', force: true },
			],
		}),
		new HtmlWebpackPlugin({
			template: './src/newtab/index.html',
			filename: 'newtab.html',
			chunks: ['newtab'],
		}),
		new HtmlWebpackPlugin({
			template: './src/options/index.html',
			filename: 'options.html',
			chunks: ['options'],
		}),
		new HtmlWebpackPlugin({
			template: './src/popup/index.html',
			filename: 'popup.html',
			chunks: ['popup'],
		}),
		new HtmlWebpackPlugin({
			template: './src/devtools/index.html',
			filename: 'devtools.html',
			chunks: ['devtools'],
		}),
		new HtmlWebpackPlugin({
			template: './src/panel/index.html',
			filename: 'panel.html',
			chunks: ['panel'],
		}),
	],
};

module.exports = configs;

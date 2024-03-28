const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const assetFileExtensions = ['jpg', 'jpeg', 'png', 'svg', 'ttf'];
const isDevelopment = process.env.NODE_ENV !== 'production';

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
				test: /\.(css|scss)$/,
				use: [{ loader: 'css-loader' }],
			},
			{
				test: new RegExp('.(' + assetFileExtensions.join('|') + ')$'),
				type: 'asset/resource',
				loader: 'file-loader',
				options: { name: '[name].[ext]' },
			},
			{ test: /\.html$/, loader: 'html-loader' },
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve('ts-loader'),
						options: {
							getCustomTransformers: isDevelopment && [
								ReactRefreshTypeScript(),
							],
							transpileOnly: isDevelopment,
						},
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'source-map-loader' },
					{
						loader: require.resolve('babel-loader'),
						options: {
							plugins: [
								isDevelopment &&
									require.resolve('react-refresh/babel'),
							].filter(Boolean),
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: assetFileExtensions
			.map((extension) => '.' + extension)
			.concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
	},
	plugins: [
		new CleanWebpackPlugin({ verbose: true }),
		new webpack.ProgressPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'manifest.json',
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

if (isDevelopment) {
	configs.devtool = 'cheap-module-source-map';
	configs.plugins.unshift(new ReactRefreshWebpackPlugin());
} else {
	configs.optimization = {
		minimize: true,
		minimizer: [new TerserPlugin({ extractComments: false })],
	};
}

module.exports = configs;

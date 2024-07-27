const webpack = require('webpack');
const { ProgressPlugin } = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const {
	AssetsRules,
	StyleHtmlRules,
	BabelJSRule,
	RemoveBlueArgonRule,
} = require('./rules');
const {
	CreateManifestFilesPlugin,
	PrepareAssetsPlugin,
	ParseEnvironmentPlugin,
	InjectPDFJsPlugins,
	ZipExtBundlePlugin,
} = require('./plugins');
const { ResolveFileExtensions, ResolveNodeModules } = require('./resolve');
const { entryPath, optimization } = require('./common');

const {
	getModeFromFlag,
	loadEnvWithEnvFileFlag,
} = require('../../../tools/bundler');

loadEnvWithEnvFileFlag();

const mode = getModeFromFlag() || 'development';
const version = process.env.npm_package_version;

console.log(`Building Peakee Extension (Mode: ${mode}, Version: ${version})`);

/** @type { import('webpack').Configuration } */
const config = {
	mode,
	target: 'web',
	devtool: mode === 'production' ? false : 'cheap-module-source-map',
	entry: {
		popup: entryPath('popup/index.tsx'),
		background: entryPath('background/index.ts'),
		contentScript: entryPath('contentScript/index.tsx'),
	},
	optimization: optimization(mode),
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../builds/ext'),
		clean: true,
	},
	module: {
		rules: [
			...AssetsRules(),
			...StyleHtmlRules(),
			BabelJSRule(),
			RemoveBlueArgonRule(),
		],
	},
	resolve: {
		extensions: ResolveFileExtensions('ext'),
		modules: ResolveNodeModules(),
	},
	plugins: [
		new CleanWebpackPlugin(),
		new ProgressPlugin(),
		ParseEnvironmentPlugin(),
		CreateManifestFilesPlugin(),
		PrepareAssetsPlugin(),
		new HtmlWebpackPlugin({
			template: entryPath('popup/index.html'),
			filename: 'popup.html',
			chunks: ['popup'],
		}),
		new HtmlWebpackPlugin({
			template: entryPath('sidepanel/index.html'),
			filename: 'sidepanel.html',
			chunks: [],
		}),
		...InjectPDFJsPlugins(),
		ZipExtBundlePlugin(mode, version),
	],
};

webpack(config, function (err) {
	if (err) throw err;
	console.log(
		`Completed! Peakee Extension (Mode: ${mode}, Version: ${version})`,
	);
});

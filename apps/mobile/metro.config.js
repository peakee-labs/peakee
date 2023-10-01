const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const monoPackages = {
	'@peakee/chat': path.resolve(__dirname, '../../packages/chat'),
	'@peakee/ui': path.resolve(__dirname, '../../packages/ui'),
};

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
	watchFolders: [
		path.resolve(__dirname, '../../node_modules'),
		...Object.values(monoPackages),
	],
	resolver: {
		extraNodeModules: monoPackages,
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

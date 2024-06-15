const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const monoPackages = {
	'@peakee/api': path.resolve(__dirname, '../../packages/api'),
	'@peakee/auth': path.resolve(__dirname, '../../packages/auth'),
	'@peakee/config': path.resolve(__dirname, '../../packages/config'),
	'@peakee/features': path.resolve(__dirname, '../../packages/features'),
	'@peakee/icons': path.resolve(__dirname, '../../packages/icons'),
	'@peakee/logger': path.resolve(__dirname, '../../packages/logger'),
	'@peakee/state': path.resolve(__dirname, '../../packages/state'),
	'@peakee/types': path.resolve(__dirname, '../../packages/types'),
	'@peakee/ui': path.resolve(__dirname, '../../packages/ui'),
	'@peakee/utils': path.resolve(__dirname, '../../packages/utils'),
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

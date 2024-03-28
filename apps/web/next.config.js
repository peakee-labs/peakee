const { DefinePlugin } = require('webpack');

/** @type {import('next').NextConfig} */
module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	transpilePackages: [
		'@peakee/ui',
		'@peakee/icons',
		'react',
		'react-native',
		'react-native-svg',
		'react-native-reanimated',
		'react-native-gesture-handler',
		'@gorhom/bottom-sheet',
		'react-native-picker-select',
	],
	webpack: (config) => {
		config.resolve.alias['react-native$'] = 'react-native-web';

		// These config make react-native-svg works on web
		config.resolve.extensions = [
			'.web.js',
			'.web.jsx',
			'.web.ts',
			'.web.tsx',
			...config.resolve.extensions,
		];

		const environments = [
			'API_KEY',
			'AUTH_DOMAIN',
			'PROJECT_ID',
			'STORAGE_BUCKET',
			'MESSAGING_SENDER_ID',
			'APP_ID',
			'MEASUREMENT_ID',
			'PEAKEE_WS_URL',
			'PEAKEE_API_URL',
			'BLINDERS_EXPLORE_URL',
		].reduce((acc, cur) => {
			acc[cur] = JSON.stringify(process.env[cur]);
			return acc;
		}, {});

		config.plugins.push(
			new DefinePlugin({
				__DEV__: process.env.NODE_ENV !== 'production' || true,
				...environments,
			}),
		);

		return config;
	},
};

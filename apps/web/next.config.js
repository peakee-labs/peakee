const { DefinePlugin } = require('webpack');

/** @type {import('next').NextConfig} */
module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	transpilePackages: ['@peakee/ui', 'react', 'react-native'],
	webpack: (config) => {
		config.resolve.alias['react-native$'] = 'react-native-web';

		const environments = [
			'API_KEY',
			'AUTH_DOMAIN',
			'PROJECT_ID',
			'STORAGE_BUCKET',
			'MESSAGING_SENDER_ID',
			'APP_ID',
			'MEASUREMENT_ID',
		].reduce((acc, cur) => {
			acc[cur] = JSON.stringify(process.env[cur]);
			return acc;
		}, {});

		config.plugins.push(
			new DefinePlugin({
				...environments,
			}),
		);

		return config;
	},
};

/** @type {import('next').NextConfig} */
module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	transpilePackages: ['@peakee/ui', 'react', 'react-native'],
	webpack: (config) => {
		config.resolve.alias['react-native$'] = 'react-native-web';

		return config;
	},
};

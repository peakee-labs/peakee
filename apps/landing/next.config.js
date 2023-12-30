/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
};

module.exports = nextConfig;

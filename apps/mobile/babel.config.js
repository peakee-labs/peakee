module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					assets: './assets',
					utils: './src/utils',
					screens: './src/screens',
				},
			},
		],
	],
};

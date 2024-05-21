module.exports = {
	presets: ['module:@react-native/babel-preset'],
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
		'react-native-reanimated/plugin',
	],
};

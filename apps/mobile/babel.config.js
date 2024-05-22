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
					components: './src/components',
				},
			},
		],
		'react-native-reanimated/plugin',
	],
};

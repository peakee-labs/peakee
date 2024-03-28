module.exports = {
	presets: [
		['@babel/preset-react', { runtime: 'automatic' }],
		'@babel/preset-typescript',
	],
	plugins: ['react-native-reanimated/plugin'],
};

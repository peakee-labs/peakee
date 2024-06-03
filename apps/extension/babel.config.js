module.exports = {
	presets: [
		['@babel/preset-react', { runtime: 'automatic' }],
		'@babel/preset-typescript',
	],
	plugins: [
		'@babel/plugin-proposal-export-namespace-from',
		'react-native-reanimated/plugin',
	],
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	...require('../../tools/jest/babel.config'),
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-transform-private-methods',
	],
};

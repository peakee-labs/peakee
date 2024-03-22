const { defaults: tsjPreset } = require('ts-jest/presets');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	...require('../../tools/jest/jest.config'),
	...tsjPreset,
	preset: 'react-native',
	transform: {
		'^.+\\.jsx$': 'babel-jest',
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.spec.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

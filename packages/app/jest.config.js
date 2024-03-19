/** @type {import('jest').Config} */
const config = {
	// currently react-native preset make things failed
	// preset: 'react-native',
	...require('../../tools/jest/jest.config'),
};

module.exports = config;

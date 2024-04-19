module.exports = {
	root: true,
	extends: ['@peakee/eslint-config'],
	ignorePatterns: ['**/build/**'],
	env: {
		node: true,
	},
	globals: {
		window: true,
		document: true,
		navigator: true,
		fetch: true,
		WebAssembly: true,
		chrome: 'readonly',
	},
	rules: {
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{ 'ts-ignore': 'allow-with-description' },
		],
	},
};

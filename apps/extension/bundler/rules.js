const path = require('path');
const fs = require('fs');
const { fontExtensions, imageExtensions } = require('./common');

const AssetsRules = () => {
	return [
		{
			test: new RegExp('.(' + fontExtensions.join('|') + ')$'),
			type: 'asset/inline',
		},
		{
			test: new RegExp('.(' + imageExtensions.join('|') + ')$'),
			type: 'asset/resource',
			loader: 'file-loader',
			options: { name: '[name].[ext]' },
		},
	];
};

const StyleHtmlRules = () => {
	return [
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
		},
		{ test: /\.html$/, loader: 'html-loader' },
	];
};

const BabelJSRule = () => {
	const internalPackages = [
		'api',
		'auth',
		'config',
		'features',
		'icons',
		'logger',
		'state',
		'types',
		'ui',
		'utils',
	];

	const resolvedInternalPackages = internalPackages.map((p) => {
		return path.resolve(__dirname, '../../../packages', p);
	});

	const transpilePackages = [
		'react',
		'react-native',
		'react-redux',
		'react-native-svg',
		'react-native-reanimated',
		'react-native-gesture-handler',
		'@gorhom/bottom-sheet',
		'@metacraft/crab',
	];

	const resolvedTranspilePackages = transpilePackages.map((p) => {
		const localPackagePath = path.resolve(__dirname, '../node_modules', p);
		if (fs.existsSync(localPackagePath)) {
			return path.resolve(__dirname, '../node_modules', p);
		} else {
			return path.resolve(__dirname, '../../../node_modules', p);
		}
	});

	return {
		test: /\.(js|jsx|ts|tsx)$/,
		exclude: [
			path.resolve(
				__dirname,
				'../../../node_modules/react-redux/node_modules/@babel',
			),
		],
		include: [
			...resolvedTranspilePackages,
			...resolvedInternalPackages,
			path.resolve(__dirname, '../src'),
		],
		use: [
			{
				loader: 'babel-loader',
				options: {
					presets: ['module:metro-react-native-babel-preset'],
					plugins: ['react-native-web'],
				},
			},
		],
	};
};

/**
 * Only need for Chrome Store submission
 */
const RemoveBlueArgonRule = () => {
	return {
		test: /\.(js|jsx|ts|tsx)$/,
		loader: 'string-replace-loader',
		options: {
			multiple: [
				{
					search: /https?:\/\/(?!.*redux)[^\s"]+\.js/,
					replace: '',
					flags: 'g',
				},
				{
					search: 'https://www.google.com/recaptcha/api.js',
					replace: '',
					flags: 'g',
				},
				{
					search: 'https://www.google.com/recaptcha/enterprise.js?render=',
					replace: '',
					flags: 'g',
				},
				{
					search: 'https://www.google.com',
					replace: '',
					flags: 'g',
				},
			],
		},
	};
};

module.exports = {
	AssetsRules,
	StyleHtmlRules,
	BabelJSRule,
	RemoveBlueArgonRule,
};

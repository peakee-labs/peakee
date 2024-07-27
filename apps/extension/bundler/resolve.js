const path = require('path');
const { imageExtensions, fontExtensions } = require('./common');

/**
 * @param {"web" | "ext"} runtime
 */
const ResolveFileExtensions = (runtime) => {
	const extExtensions = ['.ext.js', '.ext.jsx', '.ext.ts', '.ext.tsx'];
	const webExtensions = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx'];
	const jsExtensions = ['.js', '.jsx', '.ts', '.tsx'];

	if (runtime === 'web') {
		jsExtensions.unshift(...webExtensions);
	} else if (runtime === 'ext') {
		jsExtensions.unshift(...extExtensions, ...webExtensions);
	}

	const assetsExtensions = [...imageExtensions, ...fontExtensions].map(
		(ext) => `.${ext}`,
	);

	const extensions = [...assetsExtensions, ...jsExtensions];

	return extensions;
};

const ResolveNodeModules = () => {
	return [path.resolve(__dirname, 'node_modules'), 'node_modules'];
};

module.exports = { ResolveFileExtensions, ResolveNodeModules };

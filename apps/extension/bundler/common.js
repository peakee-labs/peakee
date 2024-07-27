const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const imageExtensions = ['jpg', 'jpeg', 'png', 'svg'];
const fontExtensions = ['ttf'];

/**
 * @param {String} entryPath
 * @returns {String}
 */
const entryPath = (entryPath) => {
	return path.join(__dirname, '../src', entryPath);
};

/**
 * @param {"production" | "development"} mode
 */
const optimization = (mode) => {
	if (mode === 'production') {
		return {
			minimize: true,
			minimizer: [new TerserPlugin()],
		};
	}
};

module.exports = {
	imageExtensions,
	fontExtensions,
	entryPath,
	optimization,
};

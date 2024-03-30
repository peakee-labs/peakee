// tiny wrapper with default env vars
module.exports = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	BABEL_ENV: process.env.BABEL_ENV || 'development',
	PORT: process.env.PORT || 3000,
};

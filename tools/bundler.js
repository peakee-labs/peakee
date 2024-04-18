const dotenv = require('dotenv');

const loadArgs = ({ fullKey, shortKey }) => {
	const flagIndex =
		process.argv.findIndex((arg) => arg === fullKey) ||
		process.argv.findIndex((arg) => arg === shortKey);
	if (flagIndex === -1) return;
	else if (process.argv.length < flagIndex) throw Error("Can't find flag");

	const flagValue = process.argv[flagIndex + 1] || '.env';

	return flagValue;
};

const loadEnvWithEnvFileFlag = () => {
	const envFileName = loadArgs({
		fullKey: '--envFile',
		shortKey: '-ef',
	});

	dotenv.config({ path: envFileName });
};

const getModeFromFlag = () => {
	const mode = loadArgs({
		fullKey: '--mode',
		shortKey: '-m',
	});

	return mode;
};

const getPortFromFlag = () => {
	const port = loadArgs({
		fullKey: '--port',
		shortKey: '-p',
	});

	return port;
};

module.exports = {
	loadEnvWithEnvFileFlag,
	getModeFromFlag,
	getPortFromFlag,
	loadArgs,
};

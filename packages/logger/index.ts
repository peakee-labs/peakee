/* eslint-disable @typescript-eslint/no-explicit-any */
export type Logger = ReturnType<typeof createLogger>;

let defaultLogger: Logger;

export const logger = () => {
	return defaultLogger || console;
};

export const setDefaultLogger = (_logger: Logger) => {
	defaultLogger = _logger;
};

export const createLogger = (name: string) => {
	const prefix = name;

	return {
		log(...args: any[]) {
			console.log(`[${prefix}]`, ...args);
		},
		warn(...args: any[]) {
			console.warn(`[${prefix}]`, ...args);
		},
		debug(...args: any[]) {
			console.debug(`[${prefix}]`, ...args);
		},
		error(...args: any[]) {
			console.error(`[${prefix}]`, ...args);
		},
	};
};

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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		log(...args: any[]) {
			console.log(`[${prefix}]`, ...args);
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		warn(...args: any[]) {
			console.warn(`[${prefix}]`, ...args);
		},
	};
};

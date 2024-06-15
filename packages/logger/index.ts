export type Logger = ReturnType<typeof createLogger>;

export let logger: Logger;

export const setDefaultLogger = (_logger: Logger) => {
	if (logger) throw Error('only set default logger once');
	logger = _logger;
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

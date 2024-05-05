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

export type Logger = ReturnType<typeof createLogger>;

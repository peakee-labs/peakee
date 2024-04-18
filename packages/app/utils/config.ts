export type AppConfig = {
	PEAKEE_WS_URL: string;
	PEAKEE_API_URL: string;
	BLINDERS_EXPLORE_URL: string;
	BLINDERS_PRACTICE_URL: string;
};

let defaultConfig: AppConfig;

export function config() {
	return defaultConfig;
}

export function initAppConfig(config: AppConfig) {
	defaultConfig = config;
	Object.freeze(defaultConfig);
}

export const getSystemThemeMode = () => {
	const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return isDark ? 'dark' : 'light';
};

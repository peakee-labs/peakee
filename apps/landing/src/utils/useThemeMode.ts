import { useState } from 'react';

export const useThemeMode = () => {
	const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

	const toggleMode = () => {
		setThemeMode(themeMode === 'light' ? 'dark' : 'light');
	};

	return { themeMode, toggleMode };
};

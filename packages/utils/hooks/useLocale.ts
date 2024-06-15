import { useState } from 'react';
import { logger } from '@peakee/logger';
import type { Locale } from '@peakee/types';

export const useLocale = <TypeValue>(
	localeMap: Record<Locale, Record<string, TypeValue>>,
	locale: Locale,
	defaultLocale: Locale,
) => {
	const [currLocaleMap, setLocaleMap] = useState(
		localeMap[locale] || localeMap[defaultLocale],
	);
	const changeLocale = (locale: Locale) => {
		if (!(locale in localeMap)) {
			logger().log('locale', locale, 'not existed fallback to current');
		}
		setLocaleMap(localeMap[locale] || currLocaleMap);
	};

	const localize = (key: string) => {
		return currLocaleMap[key];
	};

	return { changeLocale, localize };
};

import { useState } from 'react';
import type { Locale } from '@peakee/types';

function useLocaleMap<TypeValue>(
	localeMap: Record<Locale, Record<string, TypeValue>>,
	locale: Locale,
	defaultLocale: Locale,
) {
	const [currLocaleMap, setLocaleMap] = useState(
		localeMap[locale] || localeMap[defaultLocale],
	);
	const changeLocale = (locale: Locale) => {
		if (!(locale in localeMap)) {
			console.log('locale', locale, 'not exsited fallback to current');
		}
		setLocaleMap(localeMap[locale] || currLocaleMap);
	};

	const localize = (key: string) => {
		return currLocaleMap[key];
	};

	return { changeLocale, localize };
}

export default useLocaleMap;

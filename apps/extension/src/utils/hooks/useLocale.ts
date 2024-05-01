import { useState } from 'react';
import type { locale } from '@peakee/app/types';

function useLocaleMap<TypeValue>(
	localeMap: Record<locale, Record<string, TypeValue>>,
	locale: locale,
	defaultLocale: locale,
) {
	const [currLocaleMap, setLocaleMap] = useState(
		localeMap[locale] || localeMap[defaultLocale],
	);
	const changeLocale = (locale: locale) => {
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

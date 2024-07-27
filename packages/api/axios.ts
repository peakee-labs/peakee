import { config } from '@peakee/config';
import type { AxiosAdapter, AxiosInstance } from 'axios';
import Axios from 'axios';

import { getJWT } from './../auth/jwt';

let defaultAxios: AxiosInstance;

export function axios() {
	if (!defaultAxios) {
		return initAppAxios();
	}

	return defaultAxios;
}

type AxiosAdapterName = 'fetch' | 'xhr' | 'http' | string;

/**
 * https://github.com/axios/axios/issues/4458
 * Chrome Extension context:
 * - Requests from Background script and Newtab are not allowed to use XHR adapter (default of axios)
 * - Axios on popup page and content script works fine
 * */
export function initAppAxios(adapter?: AxiosAdapter | AxiosAdapterName) {
	const url = config().PEAKEE_API_URL;
	if (!url) throw Error("Missing 'PEAKEE_API_URL' in config");

	defaultAxios = Axios.create({
		baseURL: url,
		headers: { 'Content-Type': 'application/json' },
		adapter,
	});

	defaultAxios.interceptors.request.use(async (config) => {
		const JWT = await getJWT();
		if (JWT) {
			config.headers.Authorization = 'Bearer ' + JWT;
		}
		config.headers['Content-Type'] = 'application/json';

		return config;
	});

	return defaultAxios;
}

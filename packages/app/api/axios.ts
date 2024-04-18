import type { AxiosAdapter, AxiosInstance } from 'axios';
import Axios from 'axios';

import { config } from '../utils';

import { getJWT } from './token';

let defaultAxios: AxiosInstance;

export function axios() {
	if (!defaultAxios) {
		return initAppAxios();
	}

	return defaultAxios;
}

export function initAppAxios(adapter?: AxiosAdapter) {
	const url = config().PEAKEE_API_URL;
	if (!url) throw Error("Missing 'PEAKEE_API_URL' in config");

	defaultAxios = Axios.create({
		baseURL: url,
		headers: { 'Content-Type': 'application/json' },
		adapter,
	});

	defaultAxios.interceptors.request.use((config) => {
		const jwt = getJWT();
		if (jwt) {
			config.headers.Authorization = 'Bearer ' + jwt;
		}
		config.headers['Content-Type'] = 'application/json';

		return config;
	});

	return defaultAxios;
}

import type { AxiosInstance } from 'axios';
import Axios from 'axios';

import { config } from '../utils';

import { getJWT } from './token';

let defaultAxios: AxiosInstance;

export function axios() {
	if (!defaultAxios) {
		defaultAxios = Axios.create({
			baseURL: config().PEAKEE_API_URL,
			headers: { 'Content-Type': 'application/json' },
		});

		defaultAxios.interceptors.request.use(async (config) => {
			config.headers.Authorization = 'Bearer ' + getJWT();
			config.headers['Content-Type'] = 'application/json';

			return config;
		});
	}

	return defaultAxios;
}

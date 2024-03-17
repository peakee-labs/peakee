import type { AxiosInstance } from 'axios';
import Axios from 'axios';

import { config } from '../utils';

let defaultAxios: AxiosInstance;

export function axios() {
	if (!defaultAxios) {
		defaultAxios = Axios.create({
			baseURL: config().PEAKEE_API_URL,
			headers: { 'Content-Type': 'application/json' },
		});
	}
	return defaultAxios;
}

import Axios from 'axios';

import { config } from '../utils';

export const axios = Axios.create({
	baseURL: config().PEAKEE_API_URL,
	headers: { 'Content-Type': 'application/json' },
});

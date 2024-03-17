import Axios from 'axios';

export const axios = Axios.create({
	baseURL: PEAKEE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

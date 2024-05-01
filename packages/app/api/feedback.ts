import type { FormFeedback } from '../types';

import { axios } from './axios';

export async function postFeedback(feedback: FormFeedback) {
	try {
		await axios().post('/feedback', feedback);
		return;
	} catch (error) {
		console.log('Error posting feedback from', error);
	}
}

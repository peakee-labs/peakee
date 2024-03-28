import type { OnboardingValue } from '../types';
import { yearSince } from '../utils/date';

import { axios } from './axios';

export async function postOnboardingForm(form: OnboardingValue) {
	try {
		const age = yearSince(new Date(form.dateOfBirth));
		await axios().post(
			'/onboarding',
			JSON.stringify({
				name: form.firstName + ' ' + form.lastName,
				major: form.major,
				gender: form.gender,
				native: form.native,
				country: form.country,
				learnings: form.learnings,
				interests: [],
				age: age,
			}),
		);
	} catch (err) {
		console.log('cannot post onboarding form to server', err);
	}
}

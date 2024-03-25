import type { OnboardingValue } from '../types';

import { axios } from './axios';

export async function postOnboardingForm(form: OnboardingValue) {
	try {
		const age =
			new Date(
				new Date().getTime() - new Date(form.dateOfBirth).getTime(),
			).getFullYear() - 1970;
		console.log(age);
		const res = await axios().post(
			'/onboarding',
			JSON.stringify({
				name: form.firstName + ' ' + form.lastName,
				major: form.major,
				gender: 'gender',
				native: form.native,
				country: form.country,
				learnings: form.learnings,
				interests: [],
				age: age,
			}),
		);
		console.log(res);
	} catch (err) {
		console.log('cannot post onboarding form to server', err);
	}
}

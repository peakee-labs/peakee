import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { OnboardingValue } from '../types';

export interface Onboarding {
	progress: number;
	number: number;
	form: OnboardingValue;
}

const initialState: Onboarding = {
	progress: 0,
	number: 0,
	form: {
		dob: new Date(),
		lastName: '',
		firstName: '',
		native: '',
		learnings: [],
		major: '',
	},
};

//TODO: implement onboarding form with redux slice
export const onboardingSlice = createSlice({
	name: 'onboarding',
	initialState,
	reducers: {
		reset: () => {
			return { ...initialState, progress: 0, number: 0 };
		},
		updateName: (
			state,
			{
				payload: { firstName, lastName },
			}: PayloadAction<{ firstName: string; lastName: string }>,
		) => {
			state.progress = 1;
			state.form.firstName = firstName;
			state.form.lastName = lastName;
		},
		updateDateOfBirth: (
			state,
			{ payload: { dateOfBirth } }: PayloadAction<{ dateOfBirth: Date }>,
		) => {
			state.progress = 2;
			state.form.dob = dateOfBirth;
		},
		updateLanguage: (
			state,
			{
				payload: { native, learnings },
			}: PayloadAction<{ native: string; learnings: string[] }>,
		) => {
			state.progress = 3;
			state.form.native = native;
			state.form.learnings = learnings;
		},
	},
});

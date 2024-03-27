import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type {
	FormDateOfBirth,
	FormLanguage,
	FormName,
	OnboardingValue,
} from '../types';

export interface Onboarding {
	progress: number;
	number: number;
	form: OnboardingValue;
}

const initialState: Onboarding = {
	progress: -1,
	number: 0,
	form: {
		dateOfBirth: new Date().toDateString(),
		country: '',
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
		updateName: (
			state,
			{ payload: { firstName, lastName } }: PayloadAction<FormName>,
		) => {
			state.form.firstName = firstName;
			state.form.lastName = lastName;
		},
		updateDateOfBirth: (
			state,
			{ payload: { dateOfBirth } }: PayloadAction<FormDateOfBirth>,
		) => {
			state.form.dateOfBirth = dateOfBirth;
		},
		updateLanguage: (
			state,
			{ payload: { native, learnings } }: PayloadAction<FormLanguage>,
		) => {
			state.form.native = native;
			state.form.learnings = learnings;
		},
		updateNativeLanguage: (state, { payload }: PayloadAction<string>) => {
			state.form.native = payload;
		},
		updateLearningLanguage: (
			state,
			{ payload }: PayloadAction<string[]>,
		) => {
			state.form.learnings = payload;
		},
		updateMajor: (state, { payload }: PayloadAction<string>) => {
			state.form.major = payload;
		},
		updateCountry: (state, { payload }: PayloadAction<string>) => {
			state.form.country = payload;
		},
		updateNumber: (
			state,
			{ payload: { numSteps } }: PayloadAction<{ numSteps: number }>,
		) => {
			state.number = numSteps;
		},
		updateProgress: (state, { payload }: PayloadAction<number>) => {
			state.progress = payload;
		},
	},
});

export const {
	updateDateOfBirth,
	updateLanguage,
	updateName,
	updateProgress,
	updateNumber,
	updateMajor,
	updateLearningLanguage,
	updateNativeLanguage,
	updateCountry,
} = onboardingSlice.actions;

export const onboardingReducer = onboardingSlice.reducer;

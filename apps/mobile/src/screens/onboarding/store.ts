import { registerInDevtools, Store } from 'pullstate';

export type FormName = {
	firstName: string;
	lastName: string;
};

export type FormDob = {
	dob: Date;
};

export type FormLanguage = {
	native: string;
	learnings: Array<string>;
};
export type FormmMajor = {
	major: string;
};

export type OnboardingValue = {
	progress: number;
} & FormName &
	FormDob &
	FormLanguage &
	FormmMajor;

export const FormState = new Store<OnboardingValue>({
	progress: 0,
	firstName: '',
	lastName: '',
	dob: new Date(),
	native: '',
	learnings: [],
	major: '',
});

registerInDevtools({ FormState });

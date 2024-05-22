export type RootStackParamList = {
	Splash: undefined;
	SignIn: undefined;
	Home: undefined;
	Onboarding: undefined;
	Explore: undefined;
	Conversation: undefined;
};

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNavigation {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface RootParamList extends RootStackParamList {}
	}
}

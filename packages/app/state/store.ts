import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import type { PersistConfig } from 'redux-persist';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';

import type { ChatState } from './chat';
import { chatReducer } from './chat';
import type { ExploreState } from './explore';
import { exploreReducer } from './explore';
import type { NotificationsState } from './notifications';
import { notificationsReducer } from './notifications';
import type { OnboardingState } from './onboarding';
import { onboardingReducer } from './onboarding';
import type { PracticeState } from './practice';
import { practiceReducer } from './practice';
import type { UserState } from './user';
import { userReducer } from './user';

export type RootState = {
	user: UserState;
	chat: ChatState;
	notifications: NotificationsState;
	explore: ExploreState;
	onboarding: OnboardingState;
	practice: PracticeState;
};

let internalStore: ToolkitStore<RootState>;

let rootReducer = combineReducers({
	user: userReducer,
	chat: chatReducer,
	notifications: notificationsReducer,
	explore: exploreReducer,
	onboarding: onboardingReducer,
	practice: practiceReducer,
});

export const store = (): ToolkitStore<RootState> => {
	if (internalStore) return internalStore;

	internalStore = configureStore({
		reducer: rootReducer,
		middleware(getDefaultMiddleware) {
			// bypass redux-persist serializableCheck
			// refs: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
			return getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [
						FLUSH,
						REHYDRATE,
						PAUSE,
						PERSIST,
						PURGE,
						REGISTER,
					],
				},
			});
		},
	});

	return internalStore;
};

export const persistor = () => persistStore(store());

/**
 * Optionally apply a persisted reducer,
 * this function must be called before any store usage
 */
export const applyPersistReducers = (
	config: Omit<PersistConfig<RootState>, 'key'>,
) => {
	rootReducer = persistReducer(
		{ ...config, key: 'root' },
		rootReducer,
	) as never;
};

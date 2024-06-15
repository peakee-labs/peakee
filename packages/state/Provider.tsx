import type { FC, ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './store';

type Props = {
	children: ReactNode;
};

export const StateProvider: FC<Props> = ({ children }) => {
	return (
		<Provider store={store()}>
			<PersistGate
				loading={<ActivityIndicator />}
				persistor={persistor()}
			>
				{children}
			</PersistGate>
		</Provider>
	);
};

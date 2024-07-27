import type { FC, ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './store';

type Props = {
	/** default to True */
	enablePersist?: boolean;
	children: ReactNode;
};

export const StateProvider: FC<Props> = ({ children, enablePersist }) => {
	return (
		<Provider store={store()}>
			{enablePersist ? (
				<PersistGate
					loading={<ActivityIndicator size={'large'} />}
					persistor={persistor()}
				>
					{children}
				</PersistGate>
			) : (
				children
			)}
		</Provider>
	);
};

import type { FC } from 'react';
import { View } from 'react-native';

import HomeScreen from '../screens/Home';
import { withAuth } from '../utils/hoc';

const Home: FC = () => {
	return (
		<View>
			<HomeScreen />
		</View>
	);
};

export default withAuth(Home);

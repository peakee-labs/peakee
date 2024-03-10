import type { FC } from 'react';

import HomeScreen from '../screens/Home';
import { withAuth } from '../utils/hoc';

const Home: FC = () => {
	return <HomeScreen />;
};

export default withAuth(Home);

import type { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import AppHeader from './Header';

type Props = {
	children: ReactNode;
};

export const Container: FC<Props> = ({ children }) => {
	return (
		<View style={styles.container}>
			<AppHeader />
			{children}
		</View>
	);
};

export default Container;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100vh' as never,
	},
});

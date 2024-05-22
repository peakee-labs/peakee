import type { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaContainer } from '@peakee/ui';

type Props = {
	children: ReactNode;
};

export const DefaultContainer: FC<Props> = ({ children }) => {
	return (
		<View style={styles.container}>
			<SafeAreaContainer>{children}</SafeAreaContainer>
		</View>
	);
};

export default DefaultContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#FFFFFF',
	},
});

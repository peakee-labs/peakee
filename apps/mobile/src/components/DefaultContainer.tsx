import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaContainer } from '@peakee/ui';

type Props = {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
};

export const DefaultContainer: FC<Props> = ({ children, style }) => {
	return (
		<View style={[styles.container]}>
			<SafeAreaContainer style={style}>{children}</SafeAreaContainer>
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

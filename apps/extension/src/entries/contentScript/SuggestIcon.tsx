import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
	left: number;
	top: number;
};

export const SuggestIcon: FC<Props> = ({ left, top }) => {
	return (
		<View style={[styles.container, { left, top }]}>
			<Text>Icon</Text>
		</View>
	);
};

export default SuggestIcon;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
	},
});

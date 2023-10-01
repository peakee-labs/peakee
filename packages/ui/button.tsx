import type { FC } from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { Pressable, Text } from 'react-native';

type Props = TouchableOpacityProps & {
	title: string;
};

export const Button: FC<Props> = ({ title, style, ...props }) => {
	return (
		<Pressable style={[styles.button, style]} {...props}>
			<Text>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
	},
});

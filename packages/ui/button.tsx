import type { FC } from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { Pressable, Text } from 'react-native';

type Props = TouchableOpacityProps & {
	title: string;
};

export const Button: FC<Props> = ({ title, ...props }) => {
	return (
		<Pressable {...props}>
			<Text>{title}</Text>
		</Pressable>
	);
};

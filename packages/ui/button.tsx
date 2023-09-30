import type { FC } from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native';

type Props = TouchableOpacityProps & {
	title: string;
};

export const Button: FC<Props> = ({ title, ...props }) => {
	return <TouchableOpacity {...props}>{title}</TouchableOpacity>;
};

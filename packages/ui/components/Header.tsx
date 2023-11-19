import type { FC } from 'react';
import type { TextProps } from 'react-native';
import { Text } from 'react-native';

type Props = TextProps & {
	text: string;
};

export const Header: FC<Props> = ({ text }) => {
	return <Text>{text}</Text>;
};

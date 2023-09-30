import type { FC } from 'react';
import { Text } from 'react-native';

interface Props {
	text: string;
}
export const Header: FC<Props> = ({ text }) => {
	return <Text>{text}</Text>;
};

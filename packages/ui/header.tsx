import type { FC } from 'react';

interface Props {
	text: string;
}
export const Header: FC<Props> = ({ text }) => {
	return <h1>{text}</h1>;
};

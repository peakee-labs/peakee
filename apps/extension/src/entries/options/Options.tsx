import type { FC } from 'react';

interface Props {
	title: string;
}

const Options: FC<Props> = ({ title }: Props) => {
	return <div className="OptionsContainer">{title} Page</div>;
};

export default Options;

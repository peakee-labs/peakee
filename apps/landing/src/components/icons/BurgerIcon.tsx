import type { FC } from 'react';

type Props = {
	size?: number;
	className?: string;
};

const BurgerIcon: FC<Props> = ({ className, size = 24 }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			width={size}
			height={size}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>
	);
};

export default BurgerIcon;

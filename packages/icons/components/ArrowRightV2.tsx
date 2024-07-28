import type { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from './types';

export const ArrowRightV2: FC<IconProps> = ({
	color = '#ccc',
	size = 24,
	strokeWidth = 2,
}) => {
	return (
		<Svg
			viewBox="0 0 24 24"
			width={size}
			height={size}
			strokeWidth={strokeWidth}
			fill="none"
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path d="M5 12h14" />
			<Path d="m12 5 7 7-7 7" />
		</Svg>
	);
};

import type { FC } from 'react';
import { Path, Polygon, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Speaker: FC<IconProps> = ({ size, color, strokeWidth }) => {
	return (
		<Svg
			width={size}
			height={size}
			stroke={color}
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth={strokeWidth || '1'}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
			<Path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
			<Path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
		</Svg>
	);
};

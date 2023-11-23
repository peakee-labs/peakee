import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Switch: FC<IconProps> = ({ size, color, strokeWidth }) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path d="m3 16 4 4 4-4" />
			<Path d="M7 20V4" />
			<Path d="m21 8-4-4-4 4" />
			<Path d="M17 4v16" />
		</Svg>
	);
};

import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const MoveLeft: FC<IconProps> = ({ size, color, strokeWidth }) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth={strokeWidth || '1'}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path d="M6 8L2 12L6 16" />
			<Path d="M2 12H22" />
		</Svg>
	);
};

import type { FC } from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Copy: FC<IconProps> = ({ size, color, strokeWidth }) => {
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
			<Rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
			<Path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
		</Svg>
	);
};

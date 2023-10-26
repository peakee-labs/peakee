import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const ChevronRight: FC<IconProps> = ({ size, color, strokeWidth }) => {
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
			<Path d="m9 18 6-6-6-6" />
		</Svg>
	);
};

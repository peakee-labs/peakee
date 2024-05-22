import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Cancel: FC<IconProps> = ({ size, color, strokeWidth }) => {
	return (
		<Svg
			width={size}
			height={size}
			stroke={color}
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth={strokeWidth || '1'}
		>
			<Path d="M18 6 6 18" />
			<Path d="m6 6 12 12" />
		</Svg>
	);
};

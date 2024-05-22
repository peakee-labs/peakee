import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const Plus: FC<IconProps> = ({ size, color, strokeWidth }) => {
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
			<Path d="M5 12h14" />
			<Path d="M12 5v14" />
		</Svg>
	);
};

import type { FC } from 'react';
import { Circle, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const VerticalDots: FC<IconProps> = ({ size, color, strokeWidth }) => {
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
			<Circle cx="12" cy="12" r="1" />
			<Circle cx="12" cy="5" r="1" />
			<Circle cx="12" cy="19" r="1" />
		</Svg>
	);
};

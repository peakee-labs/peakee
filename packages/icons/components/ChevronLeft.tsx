import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const ChevronLeft: FC<IconProps> = ({ size, color }) => {
	return (
		<Svg
			width={size}
			height={size}
			stroke={color}
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path d="m15 18-6-6 6-6" />
		</Svg>
	);
};

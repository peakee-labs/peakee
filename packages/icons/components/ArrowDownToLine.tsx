import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const ArrowDownToLine: FC<IconProps> = ({
	size,
	color,
	strokeWidth,
}) => {
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
			<Path d="M12 17V3" />
			<Path d="m6 11 6 6 6-6" />
			<Path d="M19 21H5" />
		</Svg>
	);
};

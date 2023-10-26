import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const SendIcon: FC<IconProps> = ({ size, color, strokeWidth }) => {
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
			<Path d="m3 3 3 9-3 9 19-9Z" />
			<Path d="M6 12h16" />
		</Svg>
	);
};

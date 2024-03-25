import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const ArrowLeft: FC<IconProps> = ({ color, size }) => {
	return (
		<Svg viewBox="0 0 448 512" width={size} height={size} fill={color}>
			<Path
				fill={color}
				d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
			></Path>
		</Svg>
	);
};

export const ArrowRight: FC<IconProps> = ({ color, size }) => {
	return (
		<Svg viewBox="0 0 448 512" width={size} height={size} fill={color}>
			<Path
				fill={color}
				d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
			></Path>
		</Svg>
	);
};

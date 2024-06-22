import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

type Props = IconProps & { style?: StyleProp<ViewStyle> };

export const BookA: FC<Props> = ({ style, size, color, strokeWidth = '1' }) => {
	return (
		<Svg
			style={style}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
			<Path d="m8 13 4-7 4 7" />
			<Path d="M9.1 11h5.7" />
		</Svg>
	);
};

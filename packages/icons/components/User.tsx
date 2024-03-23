import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

type Props = IconProps & { style?: StyleProp<ViewStyle> };

export const User: FC<Props> = ({ style, size, color, strokeWidth = '1' }) => {
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
			<Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<Circle cx="12" cy="7" r="4" />
		</Svg>
	);
};

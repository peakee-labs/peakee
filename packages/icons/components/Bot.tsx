import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Path, Rect, Svg } from 'react-native-svg';

import type { IconProps } from './types';

type Props = IconProps & { style?: StyleProp<ViewStyle> };

export const Bot: FC<Props> = ({ style, size, color, strokeWidth = '1' }) => {
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
			<Path d="M12 8V4H8" />
			<Rect width="16" height="12" x="4" y="8" rx="2" />
			<Path d="M2 14h2" />
			<Path d="M20 14h2" />
			<Path d="M15 13v2" />
			<Path d="M9 13v2" />
		</Svg>
	);
};

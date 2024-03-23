import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Path, Rect, Svg } from 'react-native-svg';

import type { IconProps } from './types';

type Props = IconProps & { style?: StyleProp<ViewStyle> };

export const Book: FC<Props> = ({ style, size, color, strokeWidth = '1' }) => {
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
			<Rect width="8" height="18" x="3" y="3" rx="1" />
			<Path d="M7 3v18" />
			<Path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" />
		</Svg>
	);
};

import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

type Props = IconProps & { style?: StyleProp<ViewStyle> };

export const Message: FC<Props> = ({
	style,
	size,
	color,
	strokeWidth = '1',
}) => {
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
			<Path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
		</Svg>
	);
};

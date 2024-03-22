import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

type Props = IconProps & { style?: StyleProp<ViewStyle> };

export const Search: FC<Props> = ({
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
			<Circle cx="11" cy="11" r="8" />
			<Path d="m21 21-4.3-4.3" />
		</Svg>
	);
};

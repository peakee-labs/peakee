import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Circle as CircleSvg, Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

type Props = IconProps & { style?: StyleProp<ViewStyle> };

export const CircleCheck: FC<Props> = ({
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
			<CircleSvg cx="12" cy="12" r="10" />
			<Path d="m9 12 2 2 4-4" />
		</Svg>
	);
};

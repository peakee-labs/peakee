import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import type { IconProps } from './types';

type Props = IconProps & { style?: StyleProp<ViewStyle> };

export const HorizontalDrag: FC<Props> = ({
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
			<Circle cx="12" cy="9" r="1" />
			<Circle cx="19" cy="9" r="1" />
			<Circle cx="5" cy="9" r="1" />
			<Circle cx="12" cy="15" r="1" />
			<Circle cx="19" cy="15" r="1" />
			<Circle cx="5" cy="15" r="1" />
		</Svg>
	);
};

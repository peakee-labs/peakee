import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

type Props = IconProps & { style?: StyleProp<ViewStyle> };

export const PencilLine: FC<Props> = ({
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
			<Path d="M12 20h9" />
			<Path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
			<Path d="m15 5 3 3" />
		</Svg>
	);
};

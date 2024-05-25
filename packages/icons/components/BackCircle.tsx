import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from './types';

export const BackCircle: FC<IconProps> = ({ size, color, strokeWidth }) => {
	return (
		<Svg
			width={size}
			height={size}
			stroke={color}
			viewBox="0 0 16 16"
			fill="none"
			strokeWidth={strokeWidth || '1'}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path
				d="M5.99984 9.33341L2.6665 6.00008L5.99984 2.66675"
				strokeWidth="1.33333"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M2.6665 6H9.6665C10.148 6 10.6248 6.09484 11.0697 6.27911C11.5145 6.46338 11.9187 6.73346 12.2592 7.07394C12.5997 7.41442 12.8698 7.81863 13.0541 8.26349C13.2383 8.70835 13.3332 9.18515 13.3332 9.66667C13.3332 10.1482 13.2383 10.625 13.0541 11.0698C12.8698 11.5147 12.5997 11.9189 12.2592 12.2594C11.9187 12.5999 11.5145 12.87 11.0697 13.0542C10.6248 13.2385 10.148 13.3333 9.6665 13.3333H7.33317"
				strokeWidth="1.33333"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

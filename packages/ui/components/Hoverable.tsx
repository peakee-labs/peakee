import type { ReactNode } from 'react';
import { type FC, useState } from 'react';
import type { StyleProp, TouchableOpacityProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';

type Props = TouchableOpacityProps & {
	children: ReactNode;
	style?: StyleProp<TouchableOpacityProps>;
	hoverStyle?: StyleProp<TouchableOpacityProps>;
};

export const Hoverable: FC<Props> = ({
	style,
	hoverStyle,
	children,
	...props
}) => {
	const [hover, setHover] = useState(false);

	return (
		<TouchableOpacity
			style={[styles.default, style, hover && [styles.hover, hoverStyle]]}
			// @ts-ignore No overload matches this call
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			{...props}
		>
			{children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	default: {},
	hover: {
		opacity: 0.8,
	},
});

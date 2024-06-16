import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import type { StyleProp, TouchableOpacityProps } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = TouchableOpacityProps & {
	children: ReactNode | string;
	style?: StyleProp<TouchableOpacityProps>;
	hoverStyle?: StyleProp<TouchableOpacityProps>;
	hoverOpacity?: number;
};

export const Hoverable: FC<Props> = ({
	style,
	hoverStyle,
	hoverOpacity,
	children,
	...props
}) => {
	const [hover, setHover] = useState(false);

	return (
		<TouchableOpacity
			style={[
				styles.default,
				style,
				hover && [
					styles.hover,
					hoverStyle,
					hoverOpacity && { opacity: hoverOpacity },
				],
			]}
			// @ts-ignore No overload matches this call
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			{...props}
		>
			{typeof children === 'string' ? <Text>{children}</Text> : children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	default: {},
	hover: {
		opacity: 0.8,
	},
});

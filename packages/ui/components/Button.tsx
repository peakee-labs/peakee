import { type FC, useState } from 'react';
import type { StyleProp, TextStyle, TouchableOpacityProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

type Props = TouchableOpacityProps & {
	title: string;
	titleStyle?: StyleProp<TextStyle>;
};

export const Button: FC<Props> = ({ title, style, titleStyle, ...props }) => {
	const [hover, setHover] = useState(false);

	return (
		<TouchableOpacity
			style={[styles.default, hover && styles.hover, style]}
			// @ts-ignore No overload matches this call
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			{...props}
		>
			<Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	default: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 100,
		backgroundColor: '#FF9F00',
		justifyContent: 'center',
		alignItems: 'center',
	},
	hover: {
		opacity: 0.9,
	},
	titleStyle: {
		color: '#FFFFFF',
		fontWeight: '500',
	},
});

import type { FC } from 'react';
import type { GestureResponderEvent, TextProps } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { translate } from '@peakee/utils';

export const TranslatableText: FC<TextProps> = ({
	children,
	onLongPress,
	...props
}) => {
	const handleLongPress = (e: GestureResponderEvent) => {
		onLongPress?.(e);
		translate?.((children as string).trim(), 'en-vi');
	};

	return (
		<TouchableOpacity onPress={handleLongPress}>
			<Text {...props}>{children}</Text>
		</TouchableOpacity>
	);
};

export default TranslatableText;

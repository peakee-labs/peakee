import type { FC } from 'react';
import type { GestureResponderEvent, TextProps } from 'react-native';
import { Text } from 'react-native';
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
		<Text onLongPress={handleLongPress} {...props}>
			{children}
		</Text>
	);
};

export default TranslatableText;

import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
	minInsets?: EdgeInsets;
}

export const SafeAreaContainer: FC<Props> = ({
	children,
	style,
	minInsets = { top: 24, right: 0, bottom: 24, left: 0 },
}) => {
	const insets = useSafeAreaInsets();
	const containerStyle = {
		flex: 1,
		paddingTop: Math.max(insets.top, minInsets.top),
		paddingRight: Math.max(insets.right, minInsets.right),
		paddingBottom: Math.max(insets.bottom, minInsets.bottom),
		paddingLeft: Math.max(insets.left, minInsets.left),
	} as ViewStyle;

	return <View style={[containerStyle, style]}>{children}</View>;
};

export default SafeAreaContainer;

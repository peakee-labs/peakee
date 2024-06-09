import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

export type SharedProps = {
	itemContainerStyle?: StyleProp<ViewStyle>;
	titleTextStyle?: StyleProp<TextStyle>;
	mainTextStyle?: StyleProp<TextStyle>;
	extendTextStyle?: StyleProp<TextStyle>;
};

export const sharedStyles = StyleSheet.create({
	itemContainer: {
		gap: 3,
		padding: 10,
	},
	titleTextStyle: {
		fontSize: 14,
		fontWeight: '700',
		marginBottom: 3,
	},
	mainTextStyle: {
		fontSize: 16,
	},
	extendTextStyle: {
		fontSize: 16,
		fontWeight: '300',
		fontStyle: 'italic',
	},
});

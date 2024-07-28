import type { FC, ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
	suffixPlaceholder?: string;
	suffix?: ReactNode;
};

export const Input: FC<Props> = ({ suffixPlaceholder, suffix }) => {
	return (
		<View style={styles.container}>
			<TextInput style={styles.textInput} />
			<Text style={styles.suffixPlaceholder}>{suffixPlaceholder}</Text>
			{suffix}
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingRight: 10,
		paddingLeft: 16,
		borderRadius: 30,
		borderWidth: 1.6,
		borderColor: '#DADADA',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	textInput: {
		width: 100,
		flex: 1,
		outline: 'none',
	} as never,
	suffixPlaceholder: {
		opacity: 0.6,
		fontSize: 16,
		lineHeight: 16,
	},
});

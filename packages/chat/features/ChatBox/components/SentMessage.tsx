import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
	message: string;
}

export const SentMessage: FC<Props> = ({ message }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{message}</Text>
		</View>
	);
};

export default SentMessage;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#20A090',
		padding: 13,
		borderRadius: 10,
		borderBottomRightRadius: 0,
		marginLeft: 'auto',
	},
	text: {
		fontSize: 14,
		color: '#FFFFFF',
	},
});

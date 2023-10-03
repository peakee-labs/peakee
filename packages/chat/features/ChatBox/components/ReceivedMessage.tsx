import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
	message: string;
}

export const ReceivedMessage: FC<Props> = ({ message }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{message}</Text>
		</View>
	);
};

export default ReceivedMessage;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F2F7FB',
		padding: 13,
		borderRadius: 10,
		borderTopLeftRadius: 0,
		marginRight: 'auto',
	},
	text: {
		fontSize: 14,
		color: '#000000',
	},
});

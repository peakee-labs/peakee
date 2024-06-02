import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
	message: string;
	onPressText?: (text: string) => void;
}

export const ReceivedMessage: FC<Props> = ({ message, onPressText }) => {
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text
					style={styles.text}
					onPress={() => onPressText?.(message)}
				>
					{message}
				</Text>
			</View>
		</View>
	);
};

export default ReceivedMessage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'flex-start',
		paddingLeft: 4,
	},
	textContainer: {
		backgroundColor: '#F2F7FB',
		paddingVertical: 10,
		paddingHorizontal: 18,
		borderRadius: 20,
		marginRight: 50,
	},
	text: {
		fontSize: 16,
	},
});

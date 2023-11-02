import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';

interface Props {
	message: string;
}

export const ReceivedMessage: FC<Props> = ({ message }) => {
	return (
		<Animated.View layout={Layout} style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.text}>{message}</Text>
			</View>
		</Animated.View>
	);
};

export default ReceivedMessage;

const styles = StyleSheet.create({
	container: {
		alignSelf: 'flex-start',
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
		color: '#000000',
	},
});

import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';

interface Props {
	message: string;
}

export const SentMessage: FC<Props> = ({ message }) => {
	return (
		<Animated.View layout={Layout} style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.text}>{message}</Text>
			</View>
		</Animated.View>
	);
};

export default SentMessage;

const styles = StyleSheet.create({
	container: {
		alignSelf: 'flex-end',
	},
	textContainer: {
		backgroundColor: '#FF7701',
		paddingVertical: 10,
		paddingHorizontal: 18,
		borderRadius: 20,
		marginLeft: 50,
	},
	text: {
		fontSize: 16,
		color: '#FFFFFF',
	},
});

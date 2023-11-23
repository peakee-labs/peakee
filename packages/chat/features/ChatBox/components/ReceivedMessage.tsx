import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';

import { TranslatableText } from '../../components';

interface Props {
	message: string;
}

export const ReceivedMessage: FC<Props> = ({ message }) => {
	return (
		<Animated.View layout={Layout} style={styles.container}>
			<View style={styles.textContainer}>
				<TranslatableText style={styles.text}>
					{message}
				</TranslatableText>
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

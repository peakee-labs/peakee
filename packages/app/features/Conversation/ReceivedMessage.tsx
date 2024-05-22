import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { TranslatableText } from '../../components';

interface Props {
	message: string;
}

export const ReceivedMessage: FC<Props> = ({ message }) => {
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<TranslatableText style={styles.text}>
					{message}
				</TranslatableText>
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

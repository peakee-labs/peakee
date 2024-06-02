import type { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { SelectableText } from '../../components';

interface Props {
	message: string;
	type?: 'start' | 'end';
	onPressText?: (text: string) => void;
	prefix?: ReactNode;
}

export const ReceivedMessage: FC<Props> = ({
	type,
	message,
	onPressText,
	prefix,
}) => {
	return (
		<View style={styles.container}>
			{prefix}
			<View
				style={[
					styles.textContainer,
					type === 'start' && styles.start,
					type === 'end' && styles.end,
				]}
			>
				<SelectableText
					style={styles.text}
					onPress={() => onPressText?.(message)}
				>
					{message}
				</SelectableText>
			</View>
		</View>
	);
};

export default ReceivedMessage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		gap: 4,
		paddingLeft: 4,
	},

	start: {
		marginTop: 18,
		borderTopLeftRadius: 22,
		borderBottomLeftRadius: 4,
	},
	end: {
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 22,
	},
	textContainer: {
		backgroundColor: '#F2F7FB',
		paddingVertical: 6,
		paddingHorizontal: 18,
		borderRadius: 20,
		marginRight: 50,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
	},
});

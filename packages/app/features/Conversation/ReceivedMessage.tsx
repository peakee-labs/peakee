import type { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';

import type { OnSelectionFunction } from '../../components';
import { SelectableText } from '../../components';

interface Props {
	message: string;
	type?: 'start' | 'end';
	prefix?: ReactNode;
	onPressText?: (text: string) => void;
	onSelection?: OnSelectionFunction;
}

export const ReceivedMessage: FC<Props> = ({
	type,
	message,
	prefix,
	onPressText,
	onSelection,
}) => {
	return (
		<Animated.View style={styles.container} entering={SlideInLeft}>
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
					onSelection={onSelection}
				>
					{message}
				</SelectableText>
			</View>
		</Animated.View>
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

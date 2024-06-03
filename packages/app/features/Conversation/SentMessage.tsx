import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SlideInRight } from 'react-native-reanimated';
import { Circle, CircleCheck } from '@peakee/icons';

import type { OnSelectionFunction } from '../../components';
import { SelectableText } from '../../components';

interface Props {
	message: string;
	status?: 'pending' | 'delivered' | 'read';
	type?: 'start' | 'end';
	onPressText?: (text: string) => void;
	onSelection?: OnSelectionFunction;
}

export const SentMessage: FC<Props> = ({
	type,
	message,
	status,
	onPressText,
	onSelection,
}) => {
	return (
		<Animated.View entering={SlideInRight} style={styles.container}>
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
			{status === 'pending' ? (
				<Circle size={14} color={'#c4c2c2'} strokeWidth="3" />
			) : status === 'delivered' ? (
				<CircleCheck size={14} color={'#c4c2c2'} strokeWidth="3" />
			) : (
				<View style={{ width: 14 }} />
			)}
		</Animated.View>
	);
};

export default SentMessage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		gap: 2,
	},
	start: {
		marginTop: 18,
		borderTopRightRadius: 22,
		borderBottomRightRadius: 4,
	},
	end: {
		borderTopRightRadius: 6,
		borderBottomRightRadius: 22,
	},
	textContainer: {
		backgroundColor: '#2a77dc',
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 20,
		marginLeft: 50,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		color: '#FFFFFF',
	},
});

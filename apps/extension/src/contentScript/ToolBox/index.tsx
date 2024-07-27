import { type FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { BookA, Bot, Translate } from '@peakee/icons';
import { Hoverable } from '@peakee/ui';

type Props = {
	style?: StyleProp<ViewStyle>;
	onPressTranslate?: () => void;
	onPressExplain?: () => void;
	onPressDictionary?: () => void;
};

export const ToolBox: FC<Props> = ({
	style,
	onPressTranslate,
	onPressExplain,
	onPressDictionary,
}) => {
	return (
		<View style={[styles.boxContainer, style]}>
			<Hoverable
				style={styles.button}
				hoverOpacity={0.5}
				onPress={onPressTranslate}
			>
				<Translate color={'#323232'} size={13} strokeWidth="2.5" />
				<Text style={styles.title}>Translate</Text>
			</Hoverable>
			<Hoverable
				style={styles.button}
				hoverOpacity={0.5}
				onPress={onPressDictionary}
			>
				<BookA color={'#323232'} size={13} strokeWidth="2.5" />
				<Text style={styles.title}>Dictionary</Text>
			</Hoverable>
			<Hoverable
				style={styles.button}
				hoverOpacity={0.5}
				onPress={onPressExplain}
			>
				<Bot color={'#323232'} size={14} strokeWidth="2.5" />
				<Text style={styles.title}>Explain</Text>
			</Hoverable>
		</View>
	);
};

export default ToolBox;

const styles = StyleSheet.create({
	boxContainer: {
		position: 'relative',
		minWidth: 150,
		paddingTop: 10,
		paddingBottom: 28,
		paddingHorizontal: 14,
		backgroundColor: '#FFFFFF',
		borderWidth: 1.6,
		borderColor: '#DADADA',
		borderRadius: 12,
		gap: 6,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	title: {
		fontSize: 15,
		fontWeight: '500',
	},
	icon: {
		width: 15,
		height: 15,
	},
});

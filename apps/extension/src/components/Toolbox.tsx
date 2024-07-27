import { type FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { BookA, Bot, Translate } from '@peakee/icons';
import { Hoverable } from '@peakee/ui';

type Props = {
	style?: StyleProp<ViewStyle>;
	onPressTranslate?: () => void;
	onPressExplain?: () => void;
	onPressDictionary?: () => void;
};

export const Toolbox: FC<Props> = ({
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
				<Translate color={'#323232'} size={16} strokeWidth="2.5" />
			</Hoverable>
			<Hoverable
				style={styles.button}
				hoverOpacity={0.5}
				onPress={onPressDictionary}
			>
				<BookA color={'#323232'} size={16} strokeWidth="2.5" />
			</Hoverable>
			<Hoverable
				style={styles.button}
				hoverOpacity={0.5}
				onPress={onPressExplain}
			>
				<Bot color={'#323232'} size={17} strokeWidth="2.5" />
			</Hoverable>
		</View>
	);
};

export default Toolbox;

const styles = StyleSheet.create({
	boxContainer: {
		alignSelf: 'flex-start',
		flexDirection: 'row',
		gap: 12,
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 20,
		borderWidth: 1.6,
		borderColor: '#DADADA',
		backgroundColor: '#fff',
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

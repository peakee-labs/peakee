import { type FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
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
			<Hoverable hoverOpacity={0.5} onPress={onPressTranslate}>
				Translate
			</Hoverable>
			<Hoverable hoverOpacity={0.5} onPress={onPressExplain}>
				Explain
			</Hoverable>
			<Hoverable hoverOpacity={0.5} onPress={onPressDictionary}>
				Dictionary
			</Hoverable>
		</View>
	);
};

export default ToolBox;

const styles = StyleSheet.create({
	boxContainer: {
		position: 'relative',
		minWidth: 140,
		paddingTop: 10,
		paddingBottom: 20,
		paddingHorizontal: 18,
		backgroundColor: '#FFFFFF',
		borderWidth: 1.6,
		borderColor: '#DADADA',
		borderRadius: 12,
		gap: 4,
	},
	title: {
		fontWeight: '500',
		color: '#3C4043',
	},
});

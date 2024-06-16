import { type FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { assets } from '@peakee/config';
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
				<Image style={styles.icon} source={assets.external.yandex} />
				<Text style={styles.title}>Translate</Text>
			</Hoverable>
			<Hoverable
				style={styles.button}
				hoverOpacity={0.5}
				onPress={onPressDictionary}
			>
				<Image style={styles.icon} source={assets.external.oxford} />
				<Text style={styles.title}>Dictionary</Text>
			</Hoverable>
			<Hoverable
				style={styles.button}
				hoverOpacity={0.5}
				onPress={onPressExplain}
			>
				<Image style={styles.icon} source={assets.external.ai} />
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
		fontSize: 16,
		fontWeight: '600',
	},
	icon: {
		width: 20,
		height: 20,
	},
});

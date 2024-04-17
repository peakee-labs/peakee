import { type FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
	style?: StyleProp<ViewStyle>;
	onPressTranslate?: () => void;
	onPressExplain?: () => void;
};

export const ToolBox: FC<Props> = ({
	style,
	onPressTranslate,
	onPressExplain,
}) => {
	return (
		<View style={[styles.boxContainer, style]}>
			<TouchableOpacity onPress={onPressTranslate}>
				<Text style={styles.title}>Translate</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={onPressExplain}>
				<Text style={styles.title}>Explain</Text>
			</TouchableOpacity>
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
		paddingHorizontal: 14,
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#B1B6C1',
		borderRadius: 10,
		gap: 2,
	},
	title: {
		fontWeight: '500',
		color: '#5c5c5c',
	},
});

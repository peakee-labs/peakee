import type { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
	left: number;
	top: number;
	onPress?: () => void;
};

export const SuggestIcon: FC<Props> = ({ left, top, onPress }) => {
	return (
		<View style={[styles.container, { left, top }]}>
			<TouchableOpacity onPress={onPress}>
				<Image style={styles.icon} source={{ uri: '/icon-34.png' }} />
			</TouchableOpacity>
		</View>
	);
};

export default SuggestIcon;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
	},
	icon: {
		width: 18,
		height: 18,
	},
});

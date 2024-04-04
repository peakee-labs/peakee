import type { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
	onPress?: () => void;
};

export const SuggestIcon: FC<Props> = ({ onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Image style={styles.icon} source={{ uri: '/icon-34.png' }} />
		</TouchableOpacity>
	);
};

export default SuggestIcon;

const styles = StyleSheet.create({
	icon: {
		width: 18,
		height: 18,
	},
});

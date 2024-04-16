import type { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
	onPress?: () => void;
};

export const SuggestIcon: FC<Props> = ({ onPress }) => {
	const iconUri = chrome.runtime.getURL('icon-34.png');

	return (
		<TouchableOpacity onPress={onPress}>
			<Image style={styles.icon} source={{ uri: iconUri }} />
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

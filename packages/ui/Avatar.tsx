import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {
	imageUrl: string;
}

export const Avatar: FC<Props> = ({ imageUrl }) => {
	return <Image style={styles.avatar} source={{ uri: imageUrl }} />;
};

export default Avatar;

const styles = StyleSheet.create({
	avatar: {
		height: 50,
		width: 50,
		borderRadius: 25,
		borderWidth: 0.4,
	},
});

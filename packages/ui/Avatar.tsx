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
		height: 40,
		width: 40,
		borderRadius: 25,
	},
});

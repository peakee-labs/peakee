import type { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
	id: string;
	name: string;
	image: string;
}

export const Profile: FC<Props> = ({ name, image, id }) => {
	return (
		<View style={styles.container}>
			<Image style={styles.avatar} source={{ uri: image }} />
			<View>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.id}>{id}</Text>
			</View>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 10,
	},
	avatar: {
		height: 50,
		width: 50,
		borderRadius: 25,
		borderWidth: 0.4,
	},
	name: {
		fontSize: 16,
		fontWeight: '500',
		color: '#000000',
	},
	id: {
		fontSize: 12,
	},
});

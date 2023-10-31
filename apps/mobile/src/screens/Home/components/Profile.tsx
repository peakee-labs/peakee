import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@peakee/ui';

interface Props {
	id: string;
	name: string;
	image: string;
}

export const Profile: FC<Props> = ({ name, image, id }) => {
	return (
		<View style={styles.container}>
			<Avatar source={{ uri: image }} />
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
	name: {
		fontSize: 16,
		fontWeight: '500',
		color: '#000000',
	},
	id: {
		fontSize: 12,
	},
});

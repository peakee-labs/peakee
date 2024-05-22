import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar } from '@peakee/ui';

import type { RootState } from '../state';

export const ProfileFeature: FC = () => {
	const user = useSelector((state: RootState) => state.user.profile);

	if (!user) return null;

	return (
		<View style={styles.container}>
			<Avatar source={{ uri: user.imageURL }} />
			<View>
				<Text style={styles.name}>{user.name}</Text>
				<Text style={styles.id}>{user.email}</Text>
			</View>
		</View>
	);
};

export default ProfileFeature;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 10,
	},
	name: {
		fontSize: 16,
		fontWeight: '500',
	},
	id: {
		fontSize: 12,
	},
});

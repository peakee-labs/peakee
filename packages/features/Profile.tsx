import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/state';
import { Avatar } from '@peakee/ui';

type Props = {
	style?: StyleProp<ViewStyle>;
};

export const ProfileFeature: FC<Props> = ({ style }) => {
	const user = useSelector((state: RootState) => state.user.profile);

	if (!user) return null;

	return (
		<View style={[styles.container, style]}>
			<Avatar size={60} source={{ uri: user.imageURL }} />
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
		fontSize: 20,
		fontWeight: '500',
	},
	id: {
		fontSize: 14,
	},
});

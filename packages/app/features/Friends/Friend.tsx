import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Avatar } from '@peakee/ui';

import type { PublicUserProfile } from '../../types';

type Props = {
	profile: PublicUserProfile;
	onPress?: () => void;
};

export const Friend: FC<Props> = ({ profile, onPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Avatar size={46} source={{ uri: profile.imageURL }} />
			<Text>{profile.name}</Text>
		</TouchableOpacity>
	);
};

export default Friend;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		maxHeight: 120,
		gap: 2,
	},
});

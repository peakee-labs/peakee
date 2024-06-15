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
			<Avatar size={52} source={{ uri: profile.imageURL }} />
			<Text style={styles.nameText}>{splitName(profile.name)}</Text>
		</TouchableOpacity>
	);
};

export default Friend;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		maxWidth: 60,
		gap: 2,
	},
	nameText: {
		textAlign: 'center',
	},
});

const splitName = (name: string) => {
	const words = name.split(' ');
	if (words.length > 2) return words.slice(0, 2).join('');
	return name;
};

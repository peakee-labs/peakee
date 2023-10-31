import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { UserChatData } from '@peakee/db/types';
import { Avatar } from '@peakee/ui';

interface Props {
	profiles: UserChatData[];
	onPressFriend: (friend: UserChatData) => void;
}

export const Friends: FC<Props> = ({ profiles, onPressFriend }) => {
	return (
		<View style={styles.container}>
			{profiles.map((p, i) => {
				return (
					<TouchableOpacity
						key={i}
						style={styles.profileContainer}
						onPress={() => onPressFriend(p)}
					>
						<Avatar size={50} source={{ uri: p.imageUrl }} />
						<Text>{p.name}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default Friends;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 20,
	},
	profileContainer: {
		alignItems: 'center',
	},
});

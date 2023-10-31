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
						<Avatar source={{ uri: p.imageUrl }} />
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
	},
	profileContainer: {
		alignItems: 'center',
	},
	avatar: {
		height: 50,
		width: 50,
		borderRadius: 25,
		borderWidth: 0.4,
	},
});

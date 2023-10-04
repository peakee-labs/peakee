import type { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { UserChatData } from '@peakee/app/types';

interface Props {
	profiles: UserChatData[];
}

export const Friends: FC<Props> = ({ profiles }) => {
	return (
		<View style={styles.container}>
			{profiles.map((p, i) => {
				return (
					<View key={i} style={styles.profileContainer}>
						<Image
							style={styles.avatar}
							source={{ uri: p.imageUrl }}
						/>
						<Text>{p.name}</Text>
					</View>
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

import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
	title: string;
};

export const OrangeBadge: FC<Props> = ({ title }) => {
	return (
		<View style={styles.oContainer}>
			<Text style={styles.oTitle}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	oContainer: {
		backgroundColor: '#FFE7B5',
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 20,
		alignSelf: 'flex-start',
	},
	oTitle: {
		fontSize: 12,
		color: '#FF9F00',
	},
});

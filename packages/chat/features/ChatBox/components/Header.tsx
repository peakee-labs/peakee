import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeft } from '@peakee/icons';
import { Avatar } from '@peakee/ui';

interface Props {
	name: string;
	description: string;
	imageUrl: string;
	onPressBack: () => void;
}

export const Header: FC<Props> = ({
	name,
	description,
	imageUrl,
	onPressBack,
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.backButton} onPress={onPressBack}>
				<ChevronLeft size={24} color={'#000000'} />
			</TouchableOpacity>
			<View style={styles.textContainer}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
			<Avatar imageUrl={imageUrl} />
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#FFFFFF',
		paddingVertical: 8,
		paddingRight: 10,
	},
	backButton: {
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textContainer: {
		alignItems: 'center',
		gap: 2,
	},
	name: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000000',
	},
	description: {
		fontSize: 14,
		color: '#7A7A7A',
	},
});

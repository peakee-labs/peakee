import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MoveLeft, Phone, VerticalDots } from '@peakee/icons';
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
	const getUsername = (text: string) => {
		if (text.includes('@')) {
			return text.substring(0, text.indexOf('@'));
		}
		return text;
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.backButton} onPress={onPressBack}>
				<MoveLeft size={20} color={'#000000'} />
			</TouchableOpacity>

			<View style={styles.infoBlock}>
				<Avatar source={{ uri: imageUrl }} />
				<View style={styles.textContainer}>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.description}>
						{getUsername(description)}
					</Text>
				</View>
			</View>

			<View style={styles.iconsBlock}>
				<Phone size={20} color="#000000" />
				<VerticalDots size={20} color="#000000" />
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
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
	infoBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	textContainer: {
		gap: 2,
	},
	name: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000000',
	},
	description: {
		fontSize: 14,
		color: '#7A7A7A',
	},
	iconsBlock: {
		flexDirection: 'row',
		marginLeft: 'auto',
	},
});

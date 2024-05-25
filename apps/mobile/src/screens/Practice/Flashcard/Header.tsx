import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackCircle } from '@peakee/icons';
import { useNavigation } from '@react-navigation/native';

import { OrangeBadge } from './Badges';
import { collection } from './mock';

export const Header = () => {
	const { goBack } = useNavigation();

	return (
		<View style={styles.container}>
			<Image
				style={styles.icon}
				source={require('assets/flashcard.png')}
			/>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{collection.title}</Text>
				<View>
					<OrangeBadge
						title={`${collection.flashcards.length} cards`}
					/>
				</View>
			</View>

			<TouchableOpacity
				style={styles.backButton}
				hitSlop={14}
				onPress={goBack}
			>
				<BackCircle size={20} strokeWidth="3" color={'#484C52'} />
			</TouchableOpacity>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	icon: {
		width: 54,
		height: (54 * 191) / 170,
	},
	titleContainer: {
		gap: 6,
	},
	title: {
		fontSize: 20,
		fontWeight: '500',
	},
	backButton: {
		marginLeft: 'auto',
	},
});

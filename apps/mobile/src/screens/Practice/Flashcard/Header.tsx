import type { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { PracticeFlashCardCollection } from '@peakee/app/types';
import { BackCircle } from '@peakee/icons';
import { useNavigation } from '@react-navigation/native';

import { OrangeBadge } from './Badges';

export type Props = {
	collection?: PracticeFlashCardCollection;
};

export const Header: FC<Props> = ({ collection }) => {
	const { goBack } = useNavigation();

	return (
		<View style={styles.container}>
			<Image
				style={styles.icon}
				source={require('assets/flashcard.png')}
			/>
			{collection?.flashcards ? (
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{collection.name}</Text>
					<View>
						<OrangeBadge
							title={`${collection.flashcards.length} cards`}
						/>
					</View>
				</View>
			) : (
				<View></View>
			)}

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

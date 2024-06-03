import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CircleExclaimation } from '@peakee/icons';
import { Button } from '@peakee/ui';

type Props = {
	numLog: number;
	since: string;
	onPress?: () => void;
};

export const PendingFlashcardPreview: FC<Props> = ({ since, onPress }) => {
	return (
		<View style={styles.container}>
			<CircleExclaimation size={50} color={'#F9C633'} />
			<View style={styles.contentContainer}>
				<View style={styles.topContainer}>
					<Text
						style={styles.title}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{'Pending Collection'}
					</Text>

					<View>
						<Text style={styles.actionDescription}>
							Last created
						</Text>
						<Text style={styles.actionDescription}>{since}</Text>
					</View>
				</View>
				<View style={styles.bottomContainer}>
					<Text
						style={styles.description}
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						{'Generate from your daily English usage'}
					</Text>
					<Button
						titleStyle={styles.buttonText}
						style={styles.reviewButton}
						title="Create now"
						onPress={onPress}
					/>
				</View>
			</View>
		</View>
	);
};

export default PendingFlashcardPreview;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderWidth: 1,
		borderRadius: 24,
		borderColor: '#e3e3e3',
		gap: 16,
	},
	contentContainer: {
		paddingVertical: 4,
		justifyContent: 'space-between',
		paddingLeft: 4,
		flex: 1,
		gap: 6,
	},
	topContainer: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	title: {
		fontSize: 20,
		fontWeight: '600',
	},
	description: {
		fontSize: 14,
		maxWidth: '90%',
		flex: 1,
		color: '#484C52',
		lineHeight: 18,
		top: -4,
	},
	bottomContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	actionDescription: {
		color: '#484C52',
		fontSize: 12,
		fontWeight: '400',
		alignSelf: 'flex-end',
		paddingRight: 10,
	},
	reviewButton: {
		alignSelf: 'flex-end',
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	buttonText: {
		fontSize: 14,
	},
});

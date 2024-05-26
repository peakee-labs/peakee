import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@peakee/ui';

import ProcessCircle from './ProcessCircle';

type Props = {
	name?: string;
	description: string;
	reviewedCardCount: number;
	totalCardCount: number;
	onPressReview?: () => void;
};

export const FlashcardPreview: FC<Props> = ({
	name,
	description,
	reviewedCardCount,
	totalCardCount,
	onPressReview,
}) => {
	const percent = (reviewedCardCount * 100) / totalCardCount;

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<Text
					style={styles.title}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{name ? name : 'Collection'}
				</Text>
				<Text
					style={styles.description}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{description}
				</Text>
				<Button
					style={styles.reviewButton}
					title="Review"
					onPress={onPressReview}
				/>
			</View>
			<ProcessCircle
				title="Flashcard"
				percent={percent}
				color={'#2EC63D'}
			/>
		</View>
	);
};

export default FlashcardPreview;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderWidth: 1,
		borderRadius: 24,
		borderColor: '#e3e3e3',
	},
	contentContainer: {
		paddingVertical: 4,
		paddingLeft: 4,
		gap: 2,
		flex: 1,
	},
	title: {
		fontSize: 19,
		maxWidth: '90%',
		fontWeight: '600',
	},
	description: {
		fontSize: 16,
		maxWidth: '90%',
		color: '#484C52',
	},
	reviewButton: {
		marginTop: 'auto',
		alignSelf: 'flex-start',
	},
});

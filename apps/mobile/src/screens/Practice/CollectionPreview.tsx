import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { PracticeFlashCardCollectionInformation } from '@peakee/app/types';

import { FlashCardPreview } from './Flashcard/Preview';

export type Props = {
	collections: PracticeFlashCardCollectionInformation[];
};

export const CollectionPreviews: FC<Props> = ({ collections }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>My Collections</Text>
			{collections.map((collection, id) => {
				console.log(collection);
				return (
					<FlashCardPreview
						key={'collection' + collection.id + id}
						collection={collection}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
	title: {
		color: '#484C52',
		fontSize: 17,
		fontWeight: '500',
		marginBottom: 10,
	},
});

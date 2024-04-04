import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { SuggestTextInSentenceResponse } from '@peakee/app/api';

import type { Position } from '../types';

type Props = {
	position: Position;
	suggestion: SuggestTextInSentenceResponse;
};

export const SimpleSuggestBox: FC<Props> = ({ suggestion, position }) => {
	return (
		<View style={[styles.container, position]}>
			<Text style={styles.heading}>Translate</Text>
			<Text style={styles.content}>{suggestion.translate}</Text>

			<Text style={styles.heading}>Tense</Text>
			<Text style={styles.content}>
				{suggestion.grammar_analysis.tense.type}
			</Text>

			<Text style={styles.heading}>Relevant examples</Text>
			<View style={styles.examplesContainer}>
				{suggestion.expand_words.map((w, index) => {
					return (
						<Text style={styles.content} key={index}>
							{w}
						</Text>
					);
				})}
			</View>
		</View>
	);
};

export default SimpleSuggestBox;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16,
		width: 300,
		paddingBottom: 50,
		borderWidth: 1,
		borderRadius: 20,
		borderColor: '#B1B6C1',
	},
	heading: {
		fontSize: 12,
		fontWeight: '500',
		marginTop: 20,
		marginBottom: 8,
	},
	content: {
		fontSize: 20,
	},
	examplesContainer: {
		flexDirection: 'row',
		gap: 10,
	},
});

import type { Ref } from 'react';
import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ExplainPhraseInSentenceResponse } from '@peakee/app/api';

import type { Position } from '../types';

type Props = {
	position: Position;
	explanation: ExplainPhraseInSentenceResponse;
};

const _ExplanationBox = ({ explanation, position }: Props, ref: Ref<View>) => {
	return (
		<View ref={ref} style={[styles.container, position]}>
			<Text style={styles.heading}>Translate</Text>
			<Text style={styles.content}>{explanation.translate}</Text>

			<Text style={styles.heading}>IPA</Text>
			<Text style={styles.content}>{explanation.IPA}</Text>

			<Text style={styles.heading}>Sentence tense</Text>
			<View style={styles.tenseContainer}>
				<Text style={styles.mainContent}>
					{explanation.grammarAnalysis.tense.type}
				</Text>
				<Text style={styles.content}>
					Identifier: {explanation.grammarAnalysis.tense.identifier}
				</Text>
			</View>

			<Text style={styles.heading}>Sentence structure</Text>
			<View style={styles.structureContainer}>
				<Text style={styles.mainContent}>
					{explanation.grammarAnalysis.structure.structure}
				</Text>
				{/* <Text style={styles.content}>
					Type: {explanation.grammarAnalysis.structure.type}
				</Text> */}
				<Text style={styles.content}>
					Usage: {explanation.grammarAnalysis.structure.for}
				</Text>
			</View>

			<Text style={styles.heading}>Main words in sentence</Text>
			<View style={styles.examplesContainer}>
				{explanation.keyWords.map((w, index) => {
					return (
						<Text style={styles.content} key={index}>
							{w}
						</Text>
					);
				})}
			</View>

			<Text style={styles.heading}>Relevant words</Text>
			<View style={styles.examplesContainer}>
				{explanation.expandWords.map((w, index) => {
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

export const ExplanationBox = forwardRef<View, Props>(_ExplanationBox);

export default ExplanationBox;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16,
		width: 360,
		paddingBottom: 50,
		borderWidth: 1,
		borderRadius: 20,
		borderColor: '#B1B6C1',
	},
	tenseContainer: {
		gap: 4,
	},
	structureContainer: {
		gap: 4,
	},
	heading: {
		fontSize: 12,
		fontWeight: '500',
		color: '#79869c',
		marginTop: 20,
		marginBottom: 8,
	},
	mainContent: {
		fontWeight: '500',
		fontSize: 18,
	},
	content: {
		fontSize: 14,
	},
	examplesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		rowGap: 4,
		columnGap: 10,
	},
});

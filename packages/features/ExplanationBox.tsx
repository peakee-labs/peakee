import type { Ref } from 'react';
import { forwardRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import type { ExplainPhraseInSentenceResponse } from '@peakee/api';

export type Props = {
	style?: StyleProp<ViewStyle>;
	position?: Position;
	explanation: ExplainPhraseInSentenceResponse;
	titleSize?: number;
	mainContentSize?: number;
	contentSize?: number;
};

export type Position = {
	left: number;
	top: number;
};

const _ExplanationBox = (
	{
		style,
		explanation,
		position,
		contentSize,
		titleSize,
		mainContentSize,
	}: Props,
	ref: Ref<View>,
) => {
	const titleStyle = [styles.heading, { fontSize: titleSize }];
	const contentStyle = [styles.content, { fontSize: contentSize }];
	const mainContentStyle = [
		styles.mainContent,
		{ fontSize: mainContentSize },
	];

	return (
		<View ref={ref} style={[styles.container, position, style]}>
			<Text style={titleStyle}>Translate</Text>
			<Text style={contentStyle}>{explanation.translate}</Text>

			<Text style={titleStyle}>IPA</Text>
			<Text style={contentStyle}>{explanation.IPA}</Text>

			<Text style={titleStyle}>Sentence tense</Text>
			<View style={styles.tenseContainer}>
				<Text style={mainContentStyle}>
					{explanation.grammarAnalysis.tense.type}
				</Text>
				<Text style={contentStyle}>
					Identifier: {explanation.grammarAnalysis.tense.identifier}
				</Text>
			</View>

			<Text style={titleStyle}>Sentence structure</Text>
			<View style={styles.structureContainer}>
				<Text style={mainContentStyle}>
					{explanation.grammarAnalysis.structure.structure}
				</Text>
				{/* <Text style={contentStyle}>
					Type: {explanation.grammarAnalysis.structure.type}
				</Text> */}
				<Text style={contentStyle}>
					Usage: {explanation.grammarAnalysis.structure.for}
				</Text>
			</View>

			<Text style={titleStyle}>Main words in sentence</Text>
			<View style={styles.examplesContainer}>
				{explanation.keyWords.map((w, index) => {
					return (
						<Text style={contentStyle} key={index}>
							{w}
						</Text>
					);
				})}
			</View>

			<Text style={titleStyle}>Relevant words</Text>
			<View style={styles.examplesContainer}>
				{explanation.expandWords.map((w, index) => {
					return (
						<Text style={contentStyle} key={index}>
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
	container: {},
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

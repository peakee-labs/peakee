import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { ExplanationPrompts, Explanations } from '@peakee/api';
import ExplanationBoxV2 from '@peakee/features/ExplanationBoxV2';
import { ArrowRightV2 } from '@peakee/icons';

import Input from '../components/Input';
import Toolbox from '../components/Toolbox';

const mockExplanations: Explanations = [
	{
		key: 'translate',
		title: 'Translate',
		main: 'Cơ hội',
	},
	{
		key: 'IPA',
		title: 'IPA',
		main: '/mikeniz/',
	},
	{
		key: 'sentence_tense',
		title: 'Sentence tense',
		main: 'Present simple',
		extend: 'Identifier: use of ‘are’ and ‘hunt’',
	},
	{
		key: 'sentence_structure',
		title: 'Sentence structure',
		main: 'In some respects,...',
		extend: 'Usage: to contrast two ideas or situation',
	},
];

const mockExplanationPrompt: ExplanationPrompts = [
	{
		key: 'translate',
		title: 'Translate',
		main: "a string translate only 'the phrase' not 'the sentence' to Vietnamese",
	},
	{
		key: 'IPA',
		title: 'IPA',
		main: 'IPA English pronunciation of phrase',
	},
	{
		key: 'sentence_tense',
		title: 'Sentence tense',
		main: 'type of tense of the whole sentence',
		extend: 'Identifier: how user can identify the tense',
	},
	{
		key: 'sentence_structure',
		title: 'Sentence structure',
		main: "show the grammar structure of the sentence as form: 'S + V'",
		extend: 'Usage: how the structure is used for',
	},
];

export const Components = () => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Explanation Box v2</Text>
				<ExplanationBoxV2
					style={styles.explanationContainer}
					editContainerStyle={styles.explanationEditContainer}
					explanations={mockExplanations}
					prompt={mockExplanationPrompt}
				/>

				<Text style={styles.title}>Toolbox v2</Text>
				<Toolbox />

				<Text style={styles.title}>Input</Text>
				<Input
					suffixPlaceholder="tiếng Anh là gì?"
					suffix={
						<TouchableOpacity>
							<ArrowRightV2 strokeWidth="3" color={'#a4a4a4'} />
						</TouchableOpacity>
					}
				/>
			</View>
		</View>
	);
};

export default Components;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontWeight: '600',
		marginTop: 30,
		marginBottom: 20,
	},
	explanationContainer: {
		width: 400,
	},
	explanationEditContainer: {
		width: 460,
	},
});

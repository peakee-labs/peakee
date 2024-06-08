import { StyleSheet, Text, View } from 'react-native';
import type { Explanations } from '@peakee/app/api';
import ExplanationBoxV2 from '@peakee/app/features/ExplanationBoxV2';

const mockExplanations: Explanations = [
	{
		key: 'translate',
		title: 'Translate',
		main: 'Cơ hội',
		extend: 'Usage: to contrast two ideas or situation',
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

export const Component = () => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Explanation Box v2</Text>
				<ExplanationBoxV2
					style={styles.explanationContainer}
					explanations={mockExplanations}
				/>
			</View>
		</View>
	);
};

export default Component;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontWeight: '600',
		marginBottom: 20,
	},
	explanationContainer: {
		width: 400,
	},
});

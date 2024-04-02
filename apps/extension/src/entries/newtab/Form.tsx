import type { FC } from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
	onSubmit: (value: string) => void;
};

const FeedbackForm: FC<Props> = ({ onSubmit }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = () => {
		onSubmit(inputValue);
	};

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>
					Your input is valuable to Peakee
				</Text>
				<Text style={styles.description}>
					Would you mind share your thoughts to help us improve and
					tailor the platform to your needs.
				</Text>
				<View style={styles.question}>
					<Text style={styles.feedbackQuestion}>
						How likely are you to recommend peakee to your friend or
						colleagues?
					</Text>
					<TextInput
						multiline
						style={styles.input}
						placeholder="Your feedback here..."
						onChangeText={setInputValue}
						value={inputValue}
					/>
				</View>
			</View>
			<Pressable style={styles.submitButton} onPress={handleSubmit}>
				<Text style={styles.submitText}>Submit</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		paddingHorizontal: 60,
	},
	illustration: {
		width: 200,
		height: 400,
	},
	contentContainer: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		gap: 30,
	},
	title: {
		fontSize: 28,
	},
	description: {
		fontSize: 13,
		textAlign: 'center',
		width: '90%',
	},
	question: {
		width: '100%',
	},
	feedbackQuestion: {
		fontSize: 14,
		textTransform: 'uppercase',
		fontWeight: '600',
		alignSelf: 'flex-start',
	},
	input: {
		width: '100%',
		minHeight: 150,
		borderRadius: 10,
		borderWidth: 1,
		marginTop: 20,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	submitButton: {
		width: 200,
		height: 40,
		backgroundColor: '#FF9F00',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		marginBottom: 20,
	},
	submitText: {
		color: '#ffffff',
	},
});

export default FeedbackForm;

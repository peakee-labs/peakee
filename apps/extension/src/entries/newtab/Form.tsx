import type { FC } from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { locale } from '../../types';
import useLocaleMap from '../../utils/hooks/useLocale';

type Props = {
	onSubmit: (value: string) => void;
	locale: locale;
};

type Content = Record<string, string>;

const localeMap: Record<locale, Content> = {
	'en-US': {
		title: 'Your input is valuable to Peakee',
		description:
			'Would you mind share your thoughts to help us improve and tailor the platform to your needs?',
		question:
			'How likely are you to recommend peakee to your friend or colleagues?',
		questionPlaceholder: 'Your feedback here...',
		submit: 'submit',
	},
	en: {
		title: 'Your input is valuable to Peakee',
		description:
			'Would you mind share your thoughts to help us improve and tailor the platform to your needs?',
		question:
			'How likely are you to recommend peakee to your friend or colleagues?',
		questionPlaceholder: 'Your feedback here...',
		submit: 'submit',
	},
	vi: {
		title: 'Peakee rất muốn bạn giúp đỡ',
		description:
			'Bạn có thể bỏ một chút thời gian để góp ý những điều Peakee có thể cải thiện được không?',
		question:
			'Bạn cảm thấy thế nào khi giới thiệu Peakee cho bạn bè hoặc đồng nghiệp của bạn?',
		questionPlaceholder: 'Điền đánh giá của bạn vào đây...',
		submit: 'xác nhận',
	},
};

const FeedbackForm: FC<Props> = ({ onSubmit, locale }) => {
	const { localize } = useLocaleMap(localeMap, locale, 'en');
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = () => {
		onSubmit(inputValue);
	};

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{localize('title')}</Text>
				<Text style={styles.description}>
					{localize('description')}
				</Text>
				<View style={styles.question}>
					<Text style={styles.feedbackQuestion}>
						{localize('question')}
					</Text>
					<TextInput
						multiline
						style={styles.input}
						onChangeText={setInputValue}
						placeholder={localize('questionPlaceholder')}
						value={inputValue}
					/>
				</View>
			</View>
			<Pressable style={styles.submitButton} onPress={handleSubmit}>
				<Text style={styles.submitText}>{localize('submit')}</Text>
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
		textTransform: 'capitalize',
	},
});

export default FeedbackForm;

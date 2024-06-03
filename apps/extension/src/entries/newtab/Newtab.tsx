import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import {
	getPracticeWordForUser,
	getRandomPracticeWord,
	postFeedback,
} from '@peakee/app/api';
import type { Locale } from '@peakee/app/types';

import useLocaleMap from '../../utils/hooks/useLocale';

import { FeedbackModal } from './feedbackModal';
import { type ReviewContent, ReviewWord } from './ReviewWord';

const Newtab = () => {
	const [locale] = useState<Locale>(navigator.language as Locale);
	const [isOpen, setIsOpen] = useState(false);
	const [reviewContent, setReviewContent] = useState<ReviewContent>();
	const { changeLocale, localize } = useLocaleMap(localeMap, locale, 'en');

	const getNewContent = async () => {
		try {
			const data = await getPracticeWordForUser();
			if (data) {
				setReviewContent({
					text: data.request.text,
					content: data.response.translate,
					IPA: data.response.IPA,
					symnonyms: data.response.expandWords,
				});
			} else {
				const data = await getRandomPracticeWord();
				data &&
					setReviewContent({
						text: data.word,
						content: data.explain,
						symnonyms: data.expandWords,
					});
			}
		} catch (err) {
			console.log(
				'error while getting practice unit, try to get practice unit from public endpoint\nerr: ',
				err,
			);
		}
	};

	useEffect(() => {
		getNewContent();
		changeLocale(locale);
	}, [locale]);

	const handlePress = () => {
		setIsOpen((open) => !open);
	};

	const handleSubmitForm = (feedback: string) => {
		setIsOpen((open) => !open);
		if (feedback != '') console.log(feedback);

		postFeedback({ Feedback: feedback });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{localize('header')}</Text>

			<View style={styles.contentContainer}>
				{reviewContent ? (
					<ReviewWord {...reviewContent} locale={locale} />
				) : (
					<ActivityIndicator />
				)}
				<Pressable style={styles.feedbackButton} onPress={handlePress}>
					<Text style={styles.feedbackText}>
						{localize('feedbackBtn')}
					</Text>
				</Pressable>
				<FeedbackModal
					onClose={handlePress}
					onSubmit={handleSubmitForm}
					locale={locale}
					visible={isOpen}
				/>
			</View>
		</View>
	);
};

export default Newtab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100vh' as never,
		padding: 20,
	},
	header: {
		fontSize: 18,
		fontWeight: '500',
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 30,
	},
	feedbackButton: {
		position: 'fixed' as never,
		transformOrigin: 'top left',
		transform: [{ rotateZ: '-90deg' }],
		width: 160,
		height: 40,
		right: -120, // right margin of now is 160 -120 = 40,
		bottom: 20, // bottom margin now is 20 + 40 = 60
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FF9F00',
		borderTopStartRadius: 5,
		borderTopEndRadius: 5,
	},
	feedbackText: {
		textTransform: 'capitalize',
	},
});

type Content = Record<string, string>;

const localeMap: Record<Locale, Content> = {
	'en-US': {
		header: 'Peakee Tools | Learn and use Language everywhere',
		feedbackBtn: 'feedback',
	},
	en: {
		header: 'Peakee Tools | Learn and use Language everywhere',
		feedbackBtn: 'feedback',
	},
	vi: {
		header: 'Peakee | Học và sử dụng ngôn ngữ mọi nơi',
		feedbackBtn: 'phản hồi',
	},
};

import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { config } from '@peakee/app';
import type { getPracticeUnitFunction } from '@peakee/app/api';
import {
	getPracticeWordForUser,
	getRandomPracticeWord,
	postFeedback,
} from '@peakee/app/api';
import type { locale, reviewWord } from '@peakee/app/types';
import axios from 'axios';

import { auth } from '../../utils/auth';
import { initApp } from '../../utils/bootstrap';
import useLocaleMap from '../../utils/hooks/useLocale';

import { FeedbackModal } from './feedbackModal';
import { ReviewWord } from './ReviewWord';

type Content = Record<string, string>;

const localeMap: Record<locale, Content> = {
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

initApp();

const getPracticeUnit: getPracticeUnitFunction = async () => {
	if (!auth.currentUser) {
		return undefined;
	}
	console.log(auth.currentUser.metadata);
	const token = await auth.currentUser.getIdToken(true);
	console.log(token);
	const { data: word } = await axios.get<reviewWord>(
		config().PEAKEE_API_URL + '/practice/unit',
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		},
	);
	return word;
};

const Newtab = () => {
	const [locale, setLocale] = useState<locale>(navigator.language as locale);
	const [isOpen, setIsOpen] = useState(false);
	const [reviewContent, setReviewContent] = useState<reviewWord | undefined>(
		undefined,
	);
	const { changeLocale, localize } = useLocaleMap(localeMap, locale, 'en');

	const getNewContent = async (locale: string) => {
		setTimeout(async () => {
			try {
				let data;
				// const practice = await getPracticeUnit();
				data = await getPracticeWordForUser();
				if (!data) {
					data = await getRandomPracticeWord(locale);
				}
				if (data) {
					setReviewContent(data);
				}
			} catch (err) {
				console.log(
					'error while getting practice unit, try to get practice unit from public endpoint\nerr: ',
					err,
				);
			}
		}, 2000);
	};

	useEffect(() => {
		getNewContent(locale);
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
					<ReviewWord data={reviewContent} locale={locale} />
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

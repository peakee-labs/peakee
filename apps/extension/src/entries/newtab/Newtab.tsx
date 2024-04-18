import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getPracticeWordForUser, getRandomPracticeWord } from '@peakee/app/api';
import type { RootState } from '@peakee/app/state';
import type { locale, reviewWord } from '@peakee/app/types';
import { CircleXmark } from '@peakee/icons';
import axios from 'axios';

import useLocaleMap from '../../utils/hooks/useLocale';

import FeedbackForm from './Form';
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

const Newtab = () => {
	const { user: profile } = useSelector((state: RootState) => state);
	const [locale, setLocale] = useState<locale>(navigator.language as locale);
	const [isOpen, setIsOpen] = useState(false);
	const [reviewContent, setReviewContent] = useState<reviewWord | undefined>(
		undefined,
	);
	const { changeLocale, localize } = useLocaleMap(localeMap, locale, 'en');

	const getNewContent = async (locale: string) => {
		try {
			let data;
			if (profile.profile) {
				data = await getPracticeWordForUser();
			}
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

		const handlePostForm = async (
			userID: string,
			form: { comment: string },
		) => {
			try {
				const { status: status } = await axios.post(
					`http://localhost:8080/feedback/${userID}`,
					form,
				);
				return status;
			} catch (err) {
				console.log('Error post feedback', err);
			}
		};
		handlePostForm('sampleUser', { comment: feedback });
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
				<Modal
					animationType="fade"
					transparent={true}
					statusBarTranslucent
					onRequestClose={handlePress}
					visible={isOpen}
				>
					<View style={styles.modalOverlay}>
						<View style={styles.modalContent}>
							<Pressable
								style={styles.modalCloseButton}
								onPress={handlePress}
							>
								<CircleXmark color={'#000000'} size={20} />
							</Pressable>
							<FeedbackForm
								onSubmit={handleSubmitForm}
								locale={locale}
							/>
						</View>
					</View>
				</Modal>
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
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		width: 850,
		height: 500,
		backgroundColor: '#ffffff',
		padding: 20,
		borderRadius: 10,
	},
	modalCloseButton: {
		alignSelf: 'flex-end',
	},
});

import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { CircleXmark } from '@peakee/icons';
import axios from 'axios';

import type { locale, reviewWord } from '../../types';
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
	const [locale, setLocale] = useState<locale>(navigator.language as locale);
	const [isOpen, setIsOpen] = useState(false);
	const [reviewContent, setReviewContent] = useState<reviewWord | undefined>(
		undefined,
	);
	const { changeLocale, localize } = useLocaleMap(localeMap, locale, 'en');

	const getNewContent = async (locale: string) => {
		try {
			// TODO: we should have some state manager to manager user's logging state
			// this request should include tokens.
			const { data: data } = await axios.get<reviewWord>(
				`http://localhost:8084/practice/unit`,
				{
					headers: {
						Authorization:
							'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyOThjZDA3NTlkOGNmN2JjZTZhZWNhODExNmU4ZjYzMDlhNDQwMjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWluaCDEkOG6oXQgTmd1eeG7hW4gxJDDrG5oIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xwYkNZUGM3Q0NVVGViTlFLSFI2UllVNmFzcGV2NXBOVTlMNlJtNUpoTHc5bz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS96ZW5vLXBlYWtlZSIsImF1ZCI6Inplbm8tcGVha2VlIiwiYXV0aF90aW1lIjoxNzEzMTE1NDExLCJ1c2VyX2lkIjoidDdaWXR5allDYk14T2VmVUFMdThiMlA0QVZPMiIsInN1YiI6InQ3Wll0eWpZQ2JNeE9lZlVBTHU4YjJQNEFWTzIiLCJpYXQiOjE3MTMxMTU0MTEsImV4cCI6MTcxMzExOTAxMSwiZW1haWwiOiJtaW5oZGF0MTUwMTIwMDJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTgwMDQyNTE2NDM0NTkwOTYwNDMiXSwiZW1haWwiOlsibWluaGRhdDE1MDEyMDAyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.axA7IbxWvegkAtn6048ELPqKuN0Oi9BtDsI086CLgj5vuC24AUAufSWjXuxaGHVj5yF9dO__0PSn-ynibpTJpBMPDtqAAtVe5V3GHuQwOYXhSjkfgRPrEoKKnJ-5hXA-ZjkbE_W8an0KI-k_qsEhBdWP7knKxPBM6r7I9KrYZghnji2t9JVkiK6-c18jE4x1D-J0VUpf2UQ31GZsPWK9Bwv3M_-kI9SxhCeW8F_qcK6Ei-an5OYYLpCoKRVAMu4vXO0Hu1HmMSY0rVlHVTu7hv5TgAeqsUrY2Ei8Xz4OfCd06EIQbcLfh6-G_IvR6tbGnfL49S6N3A398dgCJRk_tw',
					},
				},
			);
			setReviewContent(data);
		} catch (err) {
			console.log(
				'error while getting practice unit, try to get practice unit from public endpoint\nerr: ',
				err,
			);
			// incase the first request fail,
			// we will try to get random language based on locale code from public endpoint
			const { data: data } = await axios.get<reviewWord>(
				`http://localhost:8084/practice/unit/random?lang=${locale}`,
			);
			setReviewContent(data);
			return;
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

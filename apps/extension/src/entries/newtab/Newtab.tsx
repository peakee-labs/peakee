import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { CircleXmark } from '@peakee/icons';
import axios from 'axios';

import FeedbackForm from './Form';
import { ReviewWord } from './ReviewWord';

const Newtab = () => {
	const [isOpen, setIsOpen] = useState(false);

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
				// TODO: clean this
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
			<Text style={styles.header}>
				Peakee Tools | Learn and use English everywhere
			</Text>

			<View style={styles.contentContainer}>
				<ReviewWord
					word={'Metonymy'}
					explain={
						'the act of referring to something by the name of something else that is closely connected with it'
					}
					synonyms={['Metalepsis', 'synecdoche', 'trope']}
				/>
				<Pressable style={styles.feedbackButton} onPress={handlePress}>
					<Text>Feedback</Text>
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
							<FeedbackForm onSubmit={handleSubmitForm} />
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

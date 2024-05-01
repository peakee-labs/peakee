import type { FC } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import type { locale } from '@peakee/app/types';
import { CircleXmark } from '@peakee/icons';

import FeedbackForm from './Form';

interface Props {
	visible: boolean;
	onClose: () => void;
	onSubmit: (s: string) => void;
	locale: locale;
}
export const FeedbackModal: FC<Props> = ({
	visible,
	onClose,
	onSubmit,
	locale,
}) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			statusBarTranslucent
			onRequestClose={onClose}
			visible={visible}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Pressable
						style={styles.modalCloseButton}
						onPress={onClose}
					>
						<CircleXmark color={'#000000'} size={20} />
					</Pressable>
					<FeedbackForm onSubmit={onSubmit} locale={locale} />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
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

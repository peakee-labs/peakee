import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import {
	Camera,
	ChevronRight,
	Photo,
	SendIcon,
	Translate,
} from '@peakee/icons';
import { translate } from '@peakee/utils';

interface Props {
	onPressSend: (message: string) => void;
}

export const Input: FC<Props> = ({ onPressSend }) => {
	const [message, setMessage] = useState('');
	const handleSendMessage = () => {
		onPressSend(message);
		setMessage('');
	};

	const openFeatures = () => {
		setRenderFeatures(true);
	};

	const closeFeatures = () => {
		setRenderFeatures(false);
	};

	const handlePressTranslate = () => {
		translate?.();
	};

	const [renderFeatures, setRenderFeatures] = useState(false);

	return (
		<View style={styles.container}>
			{renderFeatures && (
				<View style={styles.featuresContainer}>
					<TouchableOpacity onPress={handlePressTranslate}>
						<Translate
							size={20}
							color="#000000"
							strokeWidth="1.6"
						/>
					</TouchableOpacity>
					<Camera size={20} color="#000000" strokeWidth="1.6" />
					<Photo size={20} color="#000000" strokeWidth="1.6" />
				</View>
			)}

			<View style={styles.inputContainer}>
				{!renderFeatures && (
					<TouchableOpacity onPress={openFeatures}>
						<ChevronRight
							size={20}
							color="#000000"
							strokeWidth="1.6"
						/>
					</TouchableOpacity>
				)}

				<TextInput
					value={message}
					onChangeText={setMessage}
					style={styles.input}
					placeholder="Type a message..."
					onSubmitEditing={handleSendMessage}
					blurOnSubmit={false}
					enablesReturnKeyAutomatically
					onFocus={closeFeatures}
					onPressIn={closeFeatures}
				/>
				<TouchableOpacity
					style={styles.sendButton}
					onPress={handleSendMessage}
				>
					<SendIcon size={20} color={'#000000'} strokeWidth="1.6" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	container: {
		gap: 12,
		flexDirection: 'row',
		paddingHorizontal: 14,
		paddingVertical: 10,
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	featuresContainer: {
		flexDirection: 'row',
		gap: 8,
	},
	inputContainer: {
		flex: 1,
		gap: 12,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	input: {
		flex: 1,
		backgroundColor: '#F3F6F6',
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 18,
		height: 30,
	},
	sendButton: {
		height: 32,
		width: 32,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

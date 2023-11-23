import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ChevronRight, SendIcon } from '@peakee/icons';

interface Props {
	onPressSend: (message: string) => void;
}

export const Input: FC<Props> = ({ onPressSend }) => {
	const [message, setMessage] = useState('');
	const handleSendMessage = () => {
		onPressSend(message);
		setMessage('');
	};

	return (
		<View style={styles.container}>
			<ChevronRight size={20} color="#000000" />
			<TextInput
				value={message}
				onChangeText={setMessage}
				style={styles.input}
				placeholder="Type a message..."
				onSubmitEditing={handleSendMessage}
				blurOnSubmit={false}
				enablesReturnKeyAutomatically
			/>
			<TouchableOpacity
				style={styles.sendButton}
				onPress={handleSendMessage}
			>
				<SendIcon size={20} color={'#000000'} />
			</TouchableOpacity>
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

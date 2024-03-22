import type { FC } from 'react';
import { useState } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputContentSizeChangeEventData,
} from 'react-native';
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
	const [height, setHeight] = useState(0);
	const [message, setMessage] = useState('');
	const [maxHeightOnTextInput, setMaxHeightOnTextInput] = useState(0);
	const [maxTextLengthOnTextInput, setMaxTextLengthOnTextInput] = useState(0);
	const [renderFeatures, setRenderFeatures] = useState(false);

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

	const handleOnChangeText = (text: string) => {
		setMessage(text);
		if (text.length > maxTextLengthOnTextInput)
			setMaxTextLengthOnTextInput(text.length);
		else {
			const relativeChange = text.length / maxTextLengthOnTextInput;
			const newHeight = height * relativeChange + 10;
			setHeight(newHeight);
			setMaxHeightOnTextInput(newHeight);
			setMaxTextLengthOnTextInput(text.length);
		}
	};

	const handleOnTextInputContentSizeChange = (
		e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
	) => {
		const newHeight = e.nativeEvent.contentSize.height;
		setHeight(newHeight);
		if (newHeight > maxHeightOnTextInput) {
			setMaxHeightOnTextInput(newHeight);
		}
	};

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
					<TouchableOpacity
						style={styles.openFeaturesButton}
						onPress={openFeatures}
					>
						<ChevronRight
							size={20}
							color="#000000"
							strokeWidth="1.6"
						/>
					</TouchableOpacity>
				)}

				<TextInput
					value={message}
					onChangeText={handleOnChangeText}
					style={[styles.input, { height: Math.max(height, 30) }]}
					placeholder="Type a message..."
					onSubmitEditing={handleSendMessage}
					blurOnSubmit={false}
					enablesReturnKeyAutomatically
					onFocus={closeFeatures}
					onPressIn={closeFeatures}
					multiline
					onContentSizeChange={handleOnTextInputContentSizeChange}
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
		backgroundColor: '#FFFFFF',
	},
	openFeaturesButton: {
		height: 32,
		justifyContent: 'center',
	},
	featuresContainer: {
		flexDirection: 'row',
		gap: 8,
	},
	inputContainer: {
		flex: 1,
		gap: 12,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		alignItems: 'flex-end',
	},
	input: {
		flex: 1,
		backgroundColor: '#F3F6F6',
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 18,
		outlineStyle: 'none',
		maxHeight: 140,
	},
	sendButton: {
		height: 32,
		width: 32,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

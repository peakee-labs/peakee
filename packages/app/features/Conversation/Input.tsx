import type { FC } from 'react';
import { useState } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputContentSizeChangeEventData,
} from 'react-native';
import {
	Platform,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { ChevronRight, SendIcon, Translate } from '@peakee/icons';
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
			const newHeight = height * relativeChange;
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
							color="#979797"
							strokeWidth="2.5"
						/>
					</TouchableOpacity>
					{/* <Camera size={20} color="#979797" strokeWidth="2.5" />
					<Photo size={20} color="#979797" strokeWidth="2.5" /> */}
				</View>
			)}

			<View style={styles.inputContainer}>
				{!renderFeatures && (
					<TouchableOpacity
						style={styles.openFeaturesButton}
						onPress={openFeatures}
						hitSlop={14}
					>
						<ChevronRight
							size={20}
							color="#979797"
							strokeWidth="3"
						/>
					</TouchableOpacity>
				)}

				<TextInput
					value={message}
					onChangeText={handleOnChangeText}
					style={[
						styles.input,
						Platform.OS === 'web' && styles.inputWeb,
						{ height: Math.max(height, 36) },
					]}
					placeholder="Type a message..."
					placeholderTextColor={'#9c9c9c'}
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
					<SendIcon size={20} color={'#979797'} strokeWidth="3" />
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
		paddingVertical: 8,
		backgroundColor: '#FFFFFF',
		borderTopWidth: 1,
		borderTopColor: '#ededed',
	},
	openFeaturesButton: {
		height: 32,
		justifyContent: 'center',
	},
	featuresContainer: {
		flexDirection: 'row',
		alignItems: 'center',
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
		borderRadius: 40,
		maxHeight: 140,
	},
	inputWeb: {
		outlineStyle: 'none',
	} as never,
	sendButton: {
		height: 32,
		width: 32,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

import type { Ref } from 'react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
	ActivityIndicator,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { TextInput } from 'react-native';
import { ArrowDownToLine, Copy, Switch } from '@peakee/icons';
import Clipboard from '@react-native-clipboard/clipboard';
import { throttle } from 'lodash';

import type { TranslateFunction } from '../api';
import { translate as requestTranslateAPI } from '../api';

export type Props = {
	initText?: string;
	initLanguages?: 'en-vi' | 'vi-en';
	style?: StyleProp<ViewStyle>;
	/**
	 * allow override translate function or use default function call to translation API
	 */
	translate?: TranslateFunction;
	contentFontSize?: number;
	experimentalDynamicSize?: boolean;
	onPressUseEnglishText?: (text: string) => void;
};

const InternalTranslateBox = (
	{
		initText = '',
		initLanguages = 'en-vi',
		style,
		translate,
		contentFontSize,
		experimentalDynamicSize,
		onPressUseEnglishText,
	}: Props,
	ref: Ref<View>,
) => {
	const [loading, setLoading] = useState(false);
	const latestText = useRef<string>();
	const [text, setText] = useState(initText);
	const [translated, setTranslated] = useState('');
	const [from, setFrom] = useState(initLanguages.split('-')[0]);
	const [to, setTo] = useState(initLanguages.split('-')[1]);

	const [dynamicWidth, setDynamicWidth] = useState(0);
	const [dynamicHeight, setDynamicHeight] = useState(0);

	const commonContentStyle = {
		fontSize: contentFontSize,
	};

	const fetchTranslation = useCallback(
		throttle(async (text: string) => {
			const languages = `${from}-${to}`;
			let res;
			if (translate) {
				res = await translate(text, languages as never);
			} else {
				res = await requestTranslateAPI(text, languages as never);
			}
			if (res && res.text === latestText.current) {
				setTranslated(res.translated);
			}
		}, 800),
		[from, to],
	);

	const handleChangeText = async (text: string) => {
		latestText.current = text;
		setText(text);
		if (text !== '') {
			fetchTranslation(text);
		} else {
			setTranslated('');
		}
	};

	const switchLanguages = () => {
		const newTo = from;
		const newFrom = to;
		setFrom(newFrom);
		setTo(newTo);
		setText('');
		setTranslated('');
	};

	const copy = (text: string) => {
		Clipboard.setString(text);
	};

	const clearText = () => {
		setText('');
		setTranslated('');
	};

	useEffect(() => {
		if (text.length > 0) {
			setLoading(true);
			fetchTranslation(text)?.then(() => setLoading(false));
		}
	}, []);

	useEffect(() => {
		if (experimentalDynamicSize) {
			const singleCharWidthUnit = 8;
			const singleLineHeightUnit = 20;
			const relativeWidthFromText = text.length * singleCharWidthUnit;
			const dynamicWidth = Math.max(
				300,
				Math.min(600, relativeWidthFromText),
			);
			setDynamicWidth(dynamicWidth);
			setDynamicHeight(
				Math.max(
					80,
					Math.min(
						200,
						(singleLineHeightUnit * relativeWidthFromText) /
							dynamicWidth,
					),
				),
			);
		}
	}, [text]);

	return (
		<View
			ref={ref}
			style={[
				styles.container,
				style,
				experimentalDynamicSize && { width: dynamicWidth },
			]}
		>
			<View style={styles.header}>
				<Text style={styles.title}>
					{from == 'en' ? 'English' : 'Vietnamese'}
				</Text>

				<View style={styles.icons}>
					{onPressUseEnglishText && from == 'en' && (
						<TouchableOpacity
							onPress={() => onPressUseEnglishText?.(text)}
							hitSlop={14}
						>
							<ArrowDownToLine
								size={18}
								color={'#979797'}
								strokeWidth="2.5"
							/>
						</TouchableOpacity>
					)}

					<TouchableOpacity onPress={switchLanguages} hitSlop={14}>
						<Switch size={18} color={'#979797'} strokeWidth="2.5" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => copy(text)} hitSlop={14}>
						<Copy size={18} color={'#979797'} strokeWidth="2.5" />
					</TouchableOpacity>
					{/* <Speaker size={18} color={'#979797'} strokeWidth="2.5" /> */}
				</View>
			</View>

			<View
				style={[
					styles.textInputContainer,
					experimentalDynamicSize && { height: dynamicHeight },
				]}
			>
				<TextInput
					style={[
						styles.textInput,
						Platform.OS === 'web' && styles.textInputWeb,
						commonContentStyle,
					]}
					value={text}
					onChangeText={handleChangeText}
					placeholder="Type to translate..."
					placeholderTextColor={'#8E8E93'}
					multiline
					autoCorrect={false}
					autoCapitalize="none"
					autoComplete="off"
				/>
				{text.length > 0 && (
					<TouchableOpacity
						style={styles.clearButton}
						onPress={clearText}
					>
						<Text style={styles.clearText}>Clear</Text>
					</TouchableOpacity>
				)}
			</View>

			<View style={styles.indicator}></View>

			<View style={styles.header}>
				<Text style={styles.title}>
					{to == 'en' ? 'English' : 'Vietnamese'}
				</Text>

				<View style={styles.icons}>
					{onPressUseEnglishText && to == 'en' && (
						<TouchableOpacity
							onPress={() => onPressUseEnglishText?.(translated)}
							hitSlop={14}
						>
							<ArrowDownToLine
								size={18}
								color={'#979797'}
								strokeWidth="2.5"
							/>
						</TouchableOpacity>
					)}

					<TouchableOpacity
						onPress={() => copy(translated)}
						hitSlop={14}
					>
						<Copy size={18} color={'#979797'} strokeWidth="2.5" />
					</TouchableOpacity>
					{/* <Speaker size={18} color={'#979797'} strokeWidth="2.5" /> */}
				</View>
			</View>

			<ScrollView style={styles.translatedContainer}>
				{loading ? (
					<ActivityIndicator />
				) : (
					<Text
						style={[styles.translated, commonContentStyle]}
						selectable={true}
					>
						{translated}
					</Text>
				)}
			</ScrollView>
		</View>
	);
};

export const TranslateBox = forwardRef<View, Props>(InternalTranslateBox);

export default TranslateBox;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
	},
	loading: {
		alignSelf: 'center',
	},
	title: {
		fontSize: 14,
		fontWeight: '500',
		color: '#3C4043',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 6,
	},
	icons: {
		flexDirection: 'row',
		gap: 18,
	},
	indicator: {
		marginHorizontal: 10,
		height: 1.5,
		borderRadius: 1,
		backgroundColor: '#3C4043',
		opacity: 0.2,
		marginBottom: 20,
	},
	textInputContainer: {
		minHeight: 80,
		marginBottom: 10,
	},
	textInput: {
		// flex: 1,
		flexGrow: 1,
		fontSize: 24,
		color: '#3C4043',
		paddingHorizontal: 0,
		paddingVertical: 0,
		textAlignVertical: 'top',
	},
	textInputWeb: {
		rows: 5,
		outlineStyle: 'none',
	} as never,
	clearButton: {
		borderWidth: 1,
		borderColor: '#d5d5d5',
		borderRadius: 30,
		paddingVertical: 2,
		paddingHorizontal: 10,
		position: 'absolute',
		bottom: -6,
		right: 0,
	},
	clearText: {
		color: '#a5a5a5',
	},
	translatedContainer: {
		minHeight: 80,
		maxHeight: 200,
		marginTop: 0,
	},
	translated: {
		fontSize: 24,
		color: '#3C4043',
	},
});

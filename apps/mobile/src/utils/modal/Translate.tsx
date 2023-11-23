import { type FC, useCallback, useEffect, useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Copy, Speaker, Switch } from '@peakee/icons';
import Clipboard from '@react-native-community/clipboard';
import axios from 'axios';
import { throttle } from 'lodash';

type TranslateResponse = {
	text: string;
	translated: string;
	languages: string;
};

export type TranslateContext = {
	text?: string;
	languages: 'en-vi' | 'vi-en';
};

const TranslateModal: FC<{
	context: TranslateContext;
}> = ({ context }) => {
	const { text: initText = '', languages: initLanguages } = context;
	const [loading, setLoading] = useState(false);
	const [text, setText] = useState(initText);
	const [translated, setTranslated] = useState('');
	const [from, setFrom] = useState(initLanguages.split('-')[0]);
	const [to, setTo] = useState(initLanguages.split('-')[1]);

	const fetchTranslation = useCallback(
		throttle(async (text: string) => {
			try {
				const languages = `${from}-${to}`;
				const res = await axios.get<TranslateResponse>(
					'https://api.peakee.co/v1/translation',
					{ params: { text, languages } },
				);
				setTranslated(res.data.translated);
			} catch (e) {
				console.log('translate error', e);
			}
		}, 1000),
		[from, to],
	);

	const handleChangeText = async (text: string) => {
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

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>
					{from == 'en' ? 'English' : 'Vietnamese'}
				</Text>

				<View style={styles.icons}>
					<TouchableOpacity onPress={switchLanguages}>
						<Switch size={18} color={'#000000'} strokeWidth="1.5" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => copy(text)}>
						<Copy size={18} color={'#000000'} strokeWidth="1.5" />
					</TouchableOpacity>
					<Speaker size={18} color={'#000000'} strokeWidth="1.5" />
				</View>
			</View>

			<View style={styles.textInputContainer}>
				<TextInput
					style={styles.textInput}
					value={text}
					onChangeText={handleChangeText}
					placeholder="Type to translate..."
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
					<TouchableOpacity onPress={() => copy(translated)}>
						<Copy size={18} color={'#000000'} strokeWidth="1.5" />
					</TouchableOpacity>
					<Speaker size={18} color={'#000000'} strokeWidth="1.5" />
				</View>
			</View>

			{loading ? (
				<ActivityIndicator />
			) : (
				<Text style={styles.content} selectable={true}>
					{translated}
				</Text>
			)}
		</View>
	);
};

export default TranslateModal;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
	},
	loading: {
		alignSelf: 'center',
	},
	title: {
		fontSize: 14,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	icons: {
		flexDirection: 'row',
		gap: 12,
	},
	indicator: {
		alignSelf: 'center',
		height: 1.5,
		borderRadius: 1,
		width: 200,
		backgroundColor: '#000000',
		opacity: 0.2,
		margin: 50,
	},
	content: {
		fontSize: 24,
	},
	textInputContainer: {
		minHeight: 50,
	},
	textInput: {
		fontSize: 24,
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	clearButton: {
		position: 'absolute',
		bottom: -20,
		right: 0,
	},
	clearText: {
		color: '#000000',
	},
});

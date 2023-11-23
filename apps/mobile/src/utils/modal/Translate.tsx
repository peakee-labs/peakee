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
import axios from 'axios';
import { throttle } from 'lodash';

type TranslateResponse = {
	text: string;
	translated: string;
	languages: string;
};

export type TranslateContext = {
	text: string;
	languages: 'en-vi' | 'vi-en';
};

const TranslateModal: FC<{
	context: TranslateContext;
}> = ({ context }) => {
	const { text: initText, languages: initLanguages } = context;
	const [loading, setLoading] = useState(true);
	const [text, setText] = useState(initText);
	const [translated, setTranslated] = useState('');
	const [from, setFrom] = useState(initLanguages.split('-')[0]);
	const [to, setTo] = useState(initLanguages.split('-')[1]);

	const fetchTranslation = useCallback(
		throttle(async (text: string) => {
			const res = await axios.get<TranslateResponse>(
				'https://api.peakee.co/v1/translation',
				{ params: { text, languages: from + '-' + to } },
			);
			setTranslated(res.data.translated);
		}, 3000),
		[],
	);

	const handleChangeText = async (text: string) => {
		setText(text);
		if (text !== '') {
			fetchTranslation(text);
		}
	};

	const switchLanguages = () => {
		setFrom(to);
		setTo(from);
		setText('');
		setTranslated('');
	};

	useEffect(() => {
		setLoading(true);
		fetchTranslation(text)?.then(() => setLoading(false));
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
					<Copy size={18} color={'#000000'} strokeWidth="1.5" />
					<Speaker size={18} color={'#000000'} strokeWidth="1.5" />
				</View>
			</View>
			<TextInput
				style={styles.content}
				value={text}
				onChangeText={handleChangeText}
				placeholder="Type to translate..."
				multiline
				autoFocus
			/>

			<View style={styles.indicator}></View>

			<View style={styles.header}>
				<Text style={styles.title}>
					{to == 'en' ? 'English' : 'Vietnamese'}
				</Text>
				<View style={styles.icons}>
					<Copy size={18} color={'#000000'} strokeWidth="1.5" />
					<Speaker size={18} color={'#000000'} strokeWidth="1.5" />
				</View>
			</View>

			{loading ? (
				<ActivityIndicator />
			) : (
				<Text style={styles.content}>{translated}</Text>
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
		marginVertical: 20,
	},
});

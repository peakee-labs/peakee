import { type FC, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Copy, Speaker } from '@peakee/icons';
import type { ModalContext } from '@peakee/ui/state/modal';
import axios from 'axios';
import { throttle } from 'lodash';

type TranslateResponse = {
	text: string;
	translated: string;
	languages: string;
};

const TranslateModal: FC<{
	context?: ModalContext;
}> = ({ context }) => {
	const [loading, setLoading] = useState(true);
	const [text, setText] = useState((context?.text as string) || '');
	const [translated, setTranslated] = useState('');

	const fetchTranslation = useCallback(
		throttle(async (text: string) => {
			const res = await axios.get<TranslateResponse>(
				'https://api.peakee.co/v1/translation',
				{ params: { text } },
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

	useEffect(() => {
		setLoading(true);
		fetchTranslation(text)?.then(() => setLoading(false));
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>English</Text>
				<View style={styles.icons}>
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
				<Text style={styles.title}>Vietnamese</Text>
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
		fontSize: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	icons: {
		flexDirection: 'row',
		gap: 8,
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
		fontSize: 30,
		marginVertical: 20,
	},
});

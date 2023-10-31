import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { GPT } from '@peakee/icons';
import { throttle } from 'lodash';

import { getSuggestions } from '../../utils/gpt';

import { SuggestionsBox } from './components';

interface Props {
	incomingMessages?: string[];
}

export const Suggestions: FC<Props> = ({ incomingMessages }) => {
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(true);

	const handlePressGPT = async () => {
		if (suggestions.length > 0) {
			setOpen((value) => !value);
		} else {
			setLoading(true);
			const messagesCount = incomingMessages?.length || 0;
			if (messagesCount > 0) {
				const res = await getSuggestions(incomingMessages as string[]);
				setSuggestions(res);
			} else {
				console.log('empty incoming messages');
			}
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log('change incoming messages');
		setSuggestions([]);
		setOpen(true);
	}, [incomingMessages]);

	return (
		<View>
			{((open && suggestions?.length) || 0) > 0 && (
				<SuggestionsBox suggestions={suggestions || []} />
			)}

			<TouchableOpacity
				onPress={throttle(handlePressGPT, 2000)}
				style={styles.suggestButton}
			>
				{loading ? <ActivityIndicator /> : <GPT />}
			</TouchableOpacity>
		</View>
	);
};

export default Suggestions;

const styles = StyleSheet.create({
	suggestButton: {
		position: 'absolute',
		bottom: -12,
		right: -2,
		height: 36,
		width: 36,
	},
});

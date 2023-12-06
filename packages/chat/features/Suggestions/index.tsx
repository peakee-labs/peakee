import type { FC } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import type { Message } from '@peakee/db/types';
import { GPT } from '@peakee/icons';
import { handleGetIdToken } from '@peakee/utils';
import { throttle } from 'lodash';

import { getChatSuggestion } from '../../utils/suggest';

import { SuggestionsBox } from './components';

interface Props {
	recentMessages: Message[];
}

export const Suggestions: FC<Props> = ({ recentMessages }) => {
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(true);

	const handlePressGPT = async () => {
		if (suggestions.length > 0) {
			setOpen((value) => !value);
		} else {
			setLoading(true);
			const token = await handleGetIdToken();
			if (!token) {
				console.log('empty token');
				setLoading(false);
				return;
			}
			const messagesCount = recentMessages?.length || 0;
			if (messagesCount > 0) {
				const suggestions = await getChatSuggestion(
					recentMessages,
					token,
				);
				setSuggestions(suggestions);
			} else {
				console.log('empty incoming messages');
			}
			setLoading(false);
		}
	};

	useEffect(() => {
		setSuggestions([]);
		setOpen(true);
	}, [recentMessages]);

	return (
		<Fragment>
			{((open && suggestions?.length) || 0) > 0 && (
				<SuggestionsBox suggestions={suggestions} />
			)}

			{(recentMessages?.length || 0 > 0) && (
				<TouchableOpacity
					onPress={throttle(handlePressGPT, 2000)}
					style={styles.suggestButton}
				>
					{loading ? <ActivityIndicator /> : <GPT />}
				</TouchableOpacity>
			)}
		</Fragment>
	);
};

export default Suggestions;

const styles = StyleSheet.create({
	suggestButton: {
		zIndex: 1,
		position: 'absolute',
		bottom: 0,
		right: 0,
		height: 36,
		width: 36,
	},
});

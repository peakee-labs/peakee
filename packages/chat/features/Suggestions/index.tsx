import type { FC } from 'react';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import type { Message, UserChatData } from '@peakee/db/types';
import { GPT } from '@peakee/icons';
import { throttle } from 'lodash';

import { SuggestionsBox } from './components';

interface Props {
	incomingMessages: Message[];
	user: UserChatData | undefined;
}

type suggestionResponse = {
	suggestions: string[];
};

const handleGetChatSuggestion = async (
	user: UserChatData,
	messages: Message[],
): Promise<suggestionResponse> => {
	const request = {
		userId: user.id,
		messages: messages,
	};

	const response: suggestionResponse = await fetch(
		'https://i0e7ns9jr3.execute-api.ap-south-1.amazonaws.com/chat',
		{
			method: 'POST',
			headers: {
				ContentType: 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(request),
		},
	)
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}
			const text = await response.text();
			throw new Error(text);
		})
		.then((json) => {
			const responseJSON = json as suggestionResponse;
			return responseJSON;
		})
		.catch((err) => {
			console.log(
				`suggestion: cann't get chat suggestions from serve, err: ${err}`,
			);
			return { suggestions: [] } as suggestionResponse;
		});
	return response;
};

export const Suggestions: FC<Props> = ({ user, incomingMessages }) => {
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(true);

	const handlePressGPT = async () => {
		if (suggestions.length > 0) {
			setOpen((value) => !value);
		} else {
			setLoading(true);
			const messagesCount = incomingMessages?.length || 0;
			if (!user) {
				console.log('user chat data empty');
				setLoading(false);
				return;
			}
			if (messagesCount > 0) {
				const res = await handleGetChatSuggestion(
					user,
					incomingMessages,
				);
				setSuggestions(res.suggestions);
			} else {
				console.log('empty incoming messages');
			}
			setLoading(false);
		}
	};

	useEffect(() => {
		setSuggestions([]);
		setOpen(true);
	}, [incomingMessages]);

	return (
		<Fragment>
			{((open && suggestions?.length) || 0) > 0 && (
				<SuggestionsBox suggestions={suggestions} />
			)}

			{(incomingMessages?.length || 0 > 0) && (
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

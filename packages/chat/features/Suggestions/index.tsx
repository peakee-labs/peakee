import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import type { Message } from '@peakee/db/types';

import { SuggestionsBox } from './components';

interface Props {
	incomingMessages?: Message[];
}

export const Suggestions: FC<Props> = () => {
	const [mountSuggestionBox, setMountSuggestionBox] = useState(false);

	useEffect(() => {
		setInterval(() => {
			setMountSuggestionBox((value) => !value);
		}, 4000);
	}, []);

	return <View>{mountSuggestionBox && <SuggestionsBox />}</View>;
};

export default Suggestions;

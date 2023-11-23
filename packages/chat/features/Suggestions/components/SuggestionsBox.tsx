import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { TranslatableText } from '../../components';

interface Props {
	suggestions: string[];
}

export const SuggestionsBox: FC<Props> = ({ suggestions }) => {
	return (
		<Animated.View
			style={styles.container}
			entering={FadeInDown}
			exiting={FadeOutDown}
		>
			<TranslatableText style={styles.title}>
				Suggestions
			</TranslatableText>
			{suggestions.map((ele, index) => (
				<TranslatableText style={styles.suggestion} key={index}>
					{ele}
				</TranslatableText>
			))}
		</Animated.View>
	);
};

export default SuggestionsBox;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		padding: 8,
		backgroundColor: '#FFFFFF',
		marginBottom: 10,
		shadowOffset: {
			width: 1,
			height: 1,
		},
		elevation: 2,
		shadowOpacity: 0.2,
		shadowColor: '#000000',
	},
	title: {
		fontSize: 12,
		fontWeight: '500',
		color: '#000000',
		marginBottom: 4,
		opacity: 0.5,
	},
	suggestion: {
		fontSize: 16,
		color: '#000000',
		marginBottom: 6,
	},
});

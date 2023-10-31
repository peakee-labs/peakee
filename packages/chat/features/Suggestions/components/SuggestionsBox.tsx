import type { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { SlideOutDown, ZoomIn } from 'react-native-reanimated';

interface Props {
	suggestions: string[];
}

export const SuggestionsBox: FC<Props> = ({ suggestions }) => {
	return (
		<Animated.View
			style={[styles.container]}
			entering={ZoomIn.duration(500)}
			exiting={SlideOutDown.duration(500)}
		>
			<Text style={styles.title}>Gợi ý</Text>
			{suggestions.map((ele, index) => (
				<Text style={styles.suggestion} key={index}>
					{ele}
				</Text>
			))}
		</Animated.View>
	);
};

export default SuggestionsBox;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		borderWidth: 0.4,
		padding: 8,
		backgroundColor: '#FFFFFF',
		marginBottom: 10,
	},
	title: {
		fontWeight: '500',
		color: '#000000',
		marginBottom: 4,
	},
	suggestion: {
		fontSize: 16,
		color: '#000000',
		marginBottom: 6,
	},
});

import { StyleSheet, Text } from 'react-native';
import Animated, { SlideOutDown, ZoomIn } from 'react-native-reanimated';

export const SuggestionsBox = () => {
	return (
		<Animated.View
			style={[styles.container]}
			entering={ZoomIn.duration(500)}
			exiting={SlideOutDown.duration(500)}
		>
			<Text>Suggestions</Text>
		</Animated.View>
	);
};

export default SuggestionsBox;

const styles = StyleSheet.create({
	container: {
		height: 300,
		borderRadius: 10,
		borderWidth: 0.4,
		padding: 4,
		backgroundColor: '#FFFFFF',
	},
});

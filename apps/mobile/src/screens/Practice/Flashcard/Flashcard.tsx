import { type FC } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

type Props = {
	front: string;
	back: string;
};

export const Flashcard: FC<Props> = ({ front }) => {
	const yRotate = useSharedValue(0);
	const rotation = useDerivedValue(() => {
		return interpolate(yRotate.value, [0, 360], [0, 360]);
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotateY: rotation.value + 'deg' }],
		};
	});

	const flip = () => {
		if (yRotate.value >= 180) {
			yRotate.value = withTiming(0, { duration: 600 });
		} else {
			yRotate.value = withTiming(180, { duration: 600 });
		}
	};

	return (
		<TouchableWithoutFeedback style={styles.container} onPress={flip}>
			<Animated.View style={[styles.container, animatedStyle]}>
				<Text style={styles.title}>{front}</Text>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default Flashcard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#95FFFF',
		borderRadius: 30,
		maxHeight: 500,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 36,
		fontWeight: '600',
		textAlign: 'center',
		color: '#004040',
	},
});

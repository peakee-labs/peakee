import { type FC } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

type Props = {
	front: string;
	back: string;
};

/**
 * can not use on mobile
 */
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
			yRotate.value = withSpring(0, { duration: 5000 });
		} else {
			yRotate.value = withSpring(180, { duration: 5000 });
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
	},
	title: {
		color: '#004040',
	},
});

import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

type Props = {
	top: number;
	left: number;
	width: number;
	isPrimary?: boolean;
	onComplete?: () => void;
};

export const Line: FC<Props> = ({
	top,
	left,
	width,
	isPrimary,
	onComplete,
}) => {
	const animatedWidth = useSharedValue(0);
	const animatedStyles = useAnimatedStyle(() => {
		return {
			width: animatedWidth.value,
		};
	});

	useEffect(() => {
		animatedWidth.value = withTiming(
			width,
			{
				duration: interpolate(width, [0, 200], [200, 600]),
				easing: Easing.inOut(Easing.quad),
			},
			onComplete,
		);
	}, []);

	return (
		<Animated.View
			style={[
				styles.container,
				isPrimary && styles.primary,
				{ top, left },
				animatedStyles,
			]}
		/>
	);
};

export default Line;

// https://colorhunt.co/palette/f0ff4282cd4754b435379237
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: '#82CD47',
		height: 3.2,
		borderRadius: 3,
	},
	primary: {
		backgroundColor: '#379237',
	},
});

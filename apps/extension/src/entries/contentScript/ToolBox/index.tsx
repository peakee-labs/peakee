import { type FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

type Props = {
	style?: StyleProp<ViewStyle>;
	onPressTranslate?: () => void;
	onPressExplain?: () => void;
	onPressDictionary?: () => void;
};

type HoverItemType = 'translate' | 'explain' | 'dictionary';

export const ToolBox: FC<Props> = ({
	style,
	onPressTranslate,
	onPressExplain,
	onPressDictionary,
}) => {
	const translateScale = useSharedValue(1);
	const translateScaleStyle = useAnimatedStyle(() => {
		return { transform: [{ scale: translateScale.value }] };
	});

	const explainScale = useSharedValue(1);
	const explainScaleStyle = useAnimatedStyle(() => {
		return { transform: [{ scale: explainScale.value }] };
	});

	const dictionaryScale = useSharedValue(1);
	const dictionaryScaleStyle = useAnimatedStyle(() => {
		return { transform: [{ scale: dictionaryScale.value }] };
	});

	const handleHover = (item: HoverItemType) => {
		if (item === 'translate') {
			translateScale.value = withSpring(1.05);
		} else if (item === 'explain') {
			explainScale.value = withSpring(1.05);
		} else if (item === 'dictionary') {
			dictionaryScale.value = withSpring(1.05);
		}
	};

	const handleHoverOut = (item: HoverItemType) => {
		if (item === 'translate') {
			translateScale.value = withSpring(1);
		} else if (item === 'explain') {
			explainScale.value = withSpring(1);
		} else if (item === 'dictionary') {
			dictionaryScale.value = withSpring(1);
		}
	};

	return (
		<View style={[styles.boxContainer, style]}>
			<TouchableOpacity
				onPress={onPressTranslate}
				// @ts-ignore No overload matches this call
				onMouseEnter={() => handleHover('translate')}
				onMouseLeave={() => handleHoverOut('translate')}
			>
				<Animated.Text style={[styles.title, translateScaleStyle]}>
					Translate
				</Animated.Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={onPressExplain}
				// @ts-ignore No overload matches this call
				onMouseEnter={() => handleHover('explain')}
				onMouseLeave={() => handleHoverOut('explain')}
			>
				<Animated.Text style={[styles.title, explainScaleStyle]}>
					Explain
				</Animated.Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={onPressDictionary}
				// @ts-ignore No overload matches this call
				onMouseEnter={() => handleHover('dictionary')}
				onMouseLeave={() => handleHoverOut('dictionary')}
			>
				<Animated.Text style={[styles.title, dictionaryScaleStyle]}>
					Dictionary
				</Animated.Text>
			</TouchableOpacity>
		</View>
	);
};

export default ToolBox;

const styles = StyleSheet.create({
	boxContainer: {
		position: 'relative',
		minWidth: 140,
		paddingTop: 10,
		paddingBottom: 20,
		paddingHorizontal: 18,
		backgroundColor: '#FFFFFF',
		borderWidth: 1.6,
		borderColor: '#DADADA',
		borderRadius: 12,
		gap: 4,
	},
	title: {
		fontWeight: '500',
		color: '#3C4043',
	},
});

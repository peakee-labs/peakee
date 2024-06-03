import { type FC, useEffect, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	ZoomIn,
} from 'react-native-reanimated';

type Props = {
	style?: StyleProp<ViewStyle>;
	onPressTranslate?: () => void;
	onPressExplain?: () => void;
};

type HoverItemType = 'translate' | 'explain';

export const ToolBox: FC<Props> = ({
	style,
	onPressTranslate,
	onPressExplain,
}) => {
	const translateScale = useSharedValue(1);
	const translateScaleStyle = useAnimatedStyle(() => {
		return { transform: [{ scale: translateScale.value }] };
	});

	const explainScale = useSharedValue(1);
	const explainScaleStyle = useAnimatedStyle(() => {
		return { transform: [{ scale: explainScale.value }] };
	});

	const handleHover = (item: HoverItemType) => {
		if (item === 'translate') {
			translateScale.value = withSpring(1.05);
		} else if (item === 'explain') {
			explainScale.value = withSpring(1.05);
		}
	};

	const handleHoverOut = (item: HoverItemType) => {
		if (item === 'translate') {
			translateScale.value = withSpring(1);
		} else if (item === 'explain') {
			explainScale.value = withSpring(1);
		}
	};

	return (
		<Animated.View style={[styles.boxContainer, style]} entering={ZoomIn}>
			<TouchableOpacity
				onPress={onPressTranslate}
				onMouseEnter={() => handleHover('translate')}
				onMouseLeave={() => handleHoverOut('translate')}
			>
				<Animated.Text style={[styles.title, translateScaleStyle]}>
					Translate
				</Animated.Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={onPressExplain}
				onMouseEnter={() => handleHover('explain')}
				onMouseLeave={() => handleHoverOut('explain')}
			>
				<Animated.Text style={[styles.title, explainScaleStyle]}>
					Explain
				</Animated.Text>
			</TouchableOpacity>
		</Animated.View>
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
		borderWidth: 1,
		borderColor: '#B1B6C1',
		borderRadius: 10,
		gap: 4,
	},
	title: {
		fontWeight: '500',
		color: '#5c5c5c',
	},
});

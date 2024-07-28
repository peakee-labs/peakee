import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { Events } from '../utils/messaging';

import { channel } from './utils';

type MouseEventListener = (e: MouseEvent) => void;

export const Pin = () => {
	const xOffset = useSharedValue(0);
	const yOffset = useSharedValue(0);
	const [pressedIn, setPressedIn] = useState(false);
	const mouseListener = useRef<MouseEventListener | undefined>(undefined);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: xOffset.value },
				{ translateY: yOffset.value },
			],
		};
	});

	const handleMouseEnter = () => {
		xOffset.value = withTiming(-46);
	};

	const handleMouseLeave = () => {
		xOffset.value = withTiming(0);
	};

	const handlePressedIn = () => {
		setPressedIn(true);
	};

	const handlePressOut = () => {
		setPressedIn(false);
	};

	const handlePress = async () => {
		await channel.request({ type: Events.OPEN_PANEL });
	};

	useEffect(() => {
		if (pressedIn) {
			mouseListener.current = (e) => {
				yOffset.value += e.movementY;
			};

			document.addEventListener('mousemove', mouseListener.current);
		} else if (mouseListener.current) {
			document.removeEventListener('mousemove', mouseListener.current);
		}
	}, [pressedIn]);

	return (
		<View style={styles.container}>
			<Animated.View style={animatedStyle}>
				<TouchableOpacity
					style={styles.pinButton}
					activeOpacity={0.6}
					onPress={handlePress}
					onPressIn={handlePressedIn}
					onPressOut={handlePressOut}
					// @ts-ignore No overload matches this call
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<Image
						style={styles.icon}
						source={{
							uri: chrome.runtime.getURL('icon-34-no-bg.png'),
						}}
					/>
					<Text>Panel</Text>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};

export default Pin;

const styles = StyleSheet.create({
	container: {
		position: 'fixed' as never,
		right: -46,
		bottom: 40,
	},
	pinButton: {
		flexDirection: 'row',
		gap: 4,
		alignItems: 'center',
		backgroundColor: '#e8f1fd',
		paddingVertical: 6,
		paddingHorizontal: 8,
		borderTopLeftRadius: 24,
		borderBottomLeftRadius: 24,
	},
	icon: {
		width: 28,
		height: 28,
	},
});

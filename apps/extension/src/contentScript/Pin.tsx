import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { Events } from '../utils/messaging';

import { channel } from './utils';

export const Pin = () => {
	const yOffset = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return { transform: [{ translateX: yOffset.value }] };
	});

	const handleMouseEnter = () => {
		yOffset.value = withTiming(-46);
	};

	const handleMouseLeave = () => {
		yOffset.value = withTiming(0);
	};

	const handlePress = async () => {
		await channel.request({ type: Events.OPEN_PANEL });
	};

	return (
		<View style={styles.container}>
			<Animated.View style={animatedStyle}>
				<TouchableOpacity
					style={styles.pinButton}
					// @ts-ignore No overload matches this call
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onPress={handlePress}
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

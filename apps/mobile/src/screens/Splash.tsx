import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { store } from '@peakee/app/state';
import { useNavigation } from '@react-navigation/native';

import 'utils/auth';

const Splash = () => {
	const mountOffset = useSharedValue(-100);
	const navigation = useNavigation();

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: mountOffset.value }],
		};
	});

	useEffect(() => {
		mountOffset.value = withSpring(
			0,
			{
				damping: 18,
				mass: 2,
			},
			runOnJS(() => {
				setTimeout(() => {
					if (store.getState().user.chatData) {
						navigation.navigate('Home' as never);
					} else {
						navigation.navigate('SignIn' as never);
					}
				}, 2000);
			})() as never,
		);
	}, []);

	return (
		<View style={styles.container}>
			<Animated.Text style={[styles.title, animatedStyle]}>
				Peakee
			</Animated.Text>
			<Text style={styles.slogan}>Use the language to learn</Text>
		</View>
	);
};

export default Splash;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 8,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
	},
	title: {
		fontSize: 50,
		fontWeight: '800',
		color: '#000000',
	},
	slogan: {
		fontSize: 18,
		fontWeight: '500',
		color: '#FF7701',
		marginBottom: 100,
	},
});

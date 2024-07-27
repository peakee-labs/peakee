import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp, runOnJS } from 'react-native-reanimated';
import { initAuthPromise } from '@peakee/auth';
import { getJWT } from '@peakee/auth/jwt';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import 'utils/auth';

const Splash = () => {
	const { navigate, reset } = useNavigation();
	const firstRender = useRef(true);
	const resolveAnimationRef = useRef<() => void>(() => ({}));
	const animationRef = useRef(
		new Promise<void>((resolve) => {
			resolveAnimationRef.current = resolve;
		}),
	);

	const IconFadeIn = FadeInUp.duration(500)
		.springify()
		.withCallback(() => {
			runOnJS(resolveAnimationRef.current)();
		});

	const initApp = async () => {
		await Promise.all([initAuthPromise, animationRef.current]);

		const jwt = await getJWT();
		if (!jwt) {
			navigate('SignIn');
		} else {
			navigate('Home', { screen: 'Chat' });
		}

		firstRender.current = false;
	};

	useEffect(() => {
		initApp();
	}, []);

	useFocusEffect(
		useCallback(() => {
			if (!firstRender.current) {
				reset({ routes: [{ name: 'Splash' }] });
			}
		}, []),
	);

	return (
		<View style={styles.container}>
			<Animated.View entering={IconFadeIn}>
				<Text style={styles.title}>Peakee</Text>
			</Animated.View>
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
		fontWeight: '900',
		color: '#FF7701',
	},
});

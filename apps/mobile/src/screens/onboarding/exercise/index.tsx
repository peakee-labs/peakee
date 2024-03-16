import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackgroundImage from './../../../../assets/onboarding-background.png';
import BackgroundMessage from './../../../../assets/onboarding-message.png';
import { NavigateBar, ProgressBar } from './../components';
import { type OnboardingValue, FormState } from './../store';

const OnboardingExercise = () => {
	const navigation = useNavigation();

	const onSubmit = () => {
		FormState.update((s: OnboardingValue) => {
			s.progress += 1;
		});
		navigation.navigate('OnboardingStep6a' as never);
	};
	const onBack = () => {
		FormState.update((s: OnboardingValue) => {
			s.progress -= 1;
		});
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<ProgressBar
				current={FormState.getRawState().progress}
				max={FormState.getRawState().progress}
			/>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>Access your skills set</Text>
				<Text style={styles.titleContent}>
					Let&apos;s tailor your learning experience. Take a quick
					5-minute test to determine your current English level.
				</Text>
			</View>
			<Image
				style={styles.backgroundMessage}
				source={BackgroundMessage}
			/>
			<Image style={styles.backgroundImage} source={BackgroundImage} />
			<NavigateBar onPrev={onBack} onNext={onSubmit} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#EEEEEE',
		flex: 1,
		height: 'auto',
		zIndex: 100,
		paddingHorizontal: 60,
		paddingVertical: 10,
		justifyContent: 'space-between',
		position: 'relative',
	},
	contentContainer: {
		marginTop: 40,
		width: 'auto',
		flex: 1,
		alignSelf: 'center',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		gap: 20,
		zIndex: 2,
	},
	backgroundMessage: {
		position: 'absolute',
		left: 0,
		height: 500,
		bottom: 100,
		zIndex: 2,
		width: 300,
		resizeMode: 'contain',
	},
	title: {
		color: '#FF5A00',
		fontSize: 32,
		fontWeight: '700',
		alignSelf: 'center',
		textAlign: 'center',
		textTransform: 'capitalize',
	},
	titleContent: {
		color: '#FF5A00',
		fontSize: 14,
	},
	backgroundImage: {
		position: 'absolute',
		bottom: -60,
		left: -30,
		height: 400,
		resizeMode: 'contain',
	},
	startButton: {
		width: 200,
		height: 50,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
	},
});

export default OnboardingExercise;
export { default as OnboardingExerciseTest } from './test';

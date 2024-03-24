import { type FC, useEffect, useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { type RootState, updateNumber, updateProgress } from '../../state';
import { useAssets } from '../../utils';

import OnboardingDob from './dateOfBirth/index';
import OnboardingLearning from './language/learning';
import OnboardingDone from './done';
import OnboardingLanguage from './language';
import OnboardingMajor from './major';
import OnboardingName from './name';

export const OnboardingFlow: Array<FC<OnboardingProps>> = [
	OnboardingName,
	OnboardingDob,
	OnboardingMajor,
	OnboardingLanguage,
	OnboardingLearning,
];

export type OnboardingProps = {
	onNext?: () => void;
	onPrev?: () => void;
};

export type Props = {
	onDone: () => void;
};

const OnboardingFeature: FC<Props> = ({ onDone }) => {
	const dispatch = useDispatch();
	const { assets } = useAssets();
	const { progress, number } = useSelector(
		(root: RootState) => root.onboarding,
	);
	const handleStartOnboarding = () => {
		dispatch(updateProgress(progress + 1));
		console.log('start');
	};
	const CurrentStep = useMemo(() => OnboardingFlow[progress], [progress]);

	useEffect(() => {
		console.log(OnboardingFlow.length);
		dispatch(updateNumber({ numSteps: OnboardingFlow.length }));
	}, []);

	const handleDoneOnboarding = () => {
		onDone && onDone();
		console.log('done ');
	};

	const handleNext = () => {
		console.log('next');
	};
	const handlePrev = () => {
		console.log('prev');
	};
	return (
		<View style={styles.container}>
			{0 <= progress && progress < number ? (
				<CurrentStep onNext={handleNext} onPrev={handlePrev} />
			) : progress == -1 ? (
				<View style={styles.contentContainer}>
					<>
						<Text style={styles.title}>Welcome to Peakee</Text>
						<Text style={styles.titleDescription}>
							Let&apos;s get you set up
						</Text>
						<Text style={styles.titleContent}>
							Your info helps us make learning fun and find stuff
							you&apos;ll love. Let&apos;s dive in and get you
							learning with a twist!
						</Text>
						<Image source={assets?.message} style={styles.image} />
						<Text style={styles.footerDescription}>
							Tap the &apos;Start&apos; to set up your information
							and we&apos;take it from there.
						</Text>
						<Pressable
							style={styles.button}
							onPress={handleStartOnboarding}
						>
							<Text>Start</Text>
						</Pressable>
					</>
				</View>
			) : (
				<OnboardingDone onNext={handleDoneOnboarding} />
			)}
		</View>
	);
};
export default OnboardingFeature;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FF9F00',
		flex: 1,
		zIndex: 100,
		width: '100%',
		height: 'auto',
		justifyContent: 'space-between',
		gap: 40,
	},
	contentContainer: {
		marginVertical: 20,
		flex: 1,
		gap: 20,
	},
	title: {
		color: '#ffffff',
		fontSize: 33,
		textAlign: 'center',
		fontWeight: '700',
	},
	image: {
		width: '50%',
		height: 250,
		alignSelf: 'center',
	},
	titleDescription: {
		color: '#ffffff',
		fontSize: 20,
		textAlign: 'center',
		fontWeight: '600',
	},
	titleContent: {
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 14,
	},
	footerDescription: {
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 14,
	},
	button: {
		height: 60,
		alignSelf: 'center',
		width: 200,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 100,
	},
	buttonText: {
		color: '#FF9F00',
		fontSize: 18,
		fontWeight: '500',
	},
});

// export { default as OnboardingStep2 } from './age';
// export { default as OnboardingDone } from './done';
// export { default as OnboardingStep6 } from './exercise';
// export { default as OnboardingStep6a } from './exercise/test';
// export { default as OnboardingStep3 } from './language';
// export { default as OnboardingStep4 } from './language/learning';
// export { default as OnboardingStep5 } from './major';
// export { default as OnboardingStep1 } from './name';

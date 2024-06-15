import { type FC, useEffect, useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postOnboardingForm } from '@peakee/api/onboarding';
import { assets } from '@peakee/config';
import { type RootState, updateNumber, updateProgress } from '@peakee/state';
import { Colors } from '@peakee/ui';

import OnboardingDob from './dateOfBirth/index';
import OnboardingLearning from './language/learning';
import OnboardingCountry from './country';
import OnboardingDone from './done';
import OnboardingGender from './gender';
import OnboardingLanguage from './language';
import OnboardingMajor from './major';
import OnboardingName from './name';

export const OnboardingFlow: Array<FC<OnboardingProps>> = [
	OnboardingName,
	OnboardingDob,
	OnboardingGender,
	OnboardingCountry,
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
	const { form, progress, number } = useSelector(
		(root: RootState) => root.onboarding,
	);
	const handleStartOnboarding = () => {
		dispatch(updateProgress(progress + 1));
	};
	const CurrentStep = useMemo(() => OnboardingFlow[progress], [progress]);

	useEffect(() => {
		dispatch(updateNumber({ numSteps: OnboardingFlow.length }));
	}, []);

	const handleDoneOnboarding = async () => {
		await postOnboardingForm(form);
		onDone && onDone();
	};

	return (
		<View style={styles.container}>
			{0 <= progress && progress < number ? (
				<CurrentStep />
			) : progress == -1 ? (
				<View style={styles.contentContainer}>
					<Text style={styles.title}>Welcome to Peakee</Text>
					<Text style={styles.titleDescription}>
						Let&apos;s get you set up
					</Text>
					<Text style={styles.titleContent}>
						Your info helps us make learning fun and find stuff
						you&apos;ll love. Let&apos;s dive in and get you
						learning with a twist!
					</Text>
					<Image source={assets.message} style={styles.image} />
					<View style={styles.footer}>
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
					</View>
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
		backgroundColor: Colors.bgOrange,
		flex: 1,
		zIndex: 100,
		width: '100%',
		height: 'auto',
		gap: 40,
	},
	contentContainer: {
		marginVertical: 20,
		flex: 1,
		gap: 20,
		paddingBottom: 100,
	},
	title: {
		color: '#ffffff',
		fontSize: 33,
		textAlign: 'center',
		fontWeight: '700',
	},
	image: {
		width: 500,
		height: 350,
		alignSelf: 'center',
		resizeMode: 'contain',
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
	footer: {
		position: 'absolute',
		bottom: 0,
		alignSelf: 'center',
		gap: 20,
	},
	buttonText: {
		color: '#FF9F00',
		fontSize: 18,
		fontWeight: '500',
	},
});

import type { FC } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { type RootState } from '../../../state';
import { useAssets } from '../../../utils';
import type { OnboardingProps } from '..';

const OnboardingDone: FC<OnboardingProps> = ({ onNext }) => {
	const { form, progress, number } = useSelector(
		(root: RootState) => root.onboarding,
	);
	const { assets } = useAssets();
	const dispatch = useDispatch();

	const submitForm = () => {
		console.log(form);
	};

	const onPressStart = () => {
		submitForm();
		// move to practice
		console.log(onNext);
		onNext && onNext();
	};

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>
					Hooray! You&apos;re all setted up and ready to rock!
				</Text>
				<Text style={styles.titleDescription}>
					🎉 Let&apos;s dive into the fun stuff!
				</Text>
				<View style={styles.content}>
					<Image
						style={styles.contentImage}
						source={assets?.messagePuzzle}
					/>
					<Text style={styles.contentText}>
						Ready to spice things up even more?
					</Text>
					<Text style={styles.contentText}>
						Tap the button below to enter the home screen and start
						exploring. Enjoy! 🚀
					</Text>
				</View>
			</View>
			<View style={styles.footer}>
				<Pressable style={styles.button} onPress={onPressStart}>
					<Text style={styles.buttonText}>Let&apos;s Start</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FF9F00',
		flex: 1,
		paddingVertical: 20,
		paddingTop: 80,
		paddingHorizontal: 40,
	},
	contentContainer: {
		flex: 1,
		alignSelf: 'center',
	},
	title: {
		alignSelf: 'center',
		fontSize: 30,
		fontWeight: '700',
		color: '#eeeeee',
		textAlign: 'center',
	},
	titleDescription: {
		alignSelf: 'center',
		fontSize: 16,
		fontWeight: '700',
		color: '#eeeeee',
		textAlign: 'center',
	},
	content: {
		flex: 1,
		alignItems: 'center',
	},
	contentImage: {
		resizeMode: 'cover',
		height: 200,
		width: '50%',
	},
	contentText: {
		color: '#ffffff',
		fontSize: 17,
		textAlign: 'center',
	},
	footer: {
		flexDirection: 'column',
		gap: 20,
	},
	button: {
		alignSelf: 'center',
		width: '80%',
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff',
		borderRadius: 50,
	},
	buttonText: {
		color: '#FF9F00',
		fontSize: 18,
		fontWeight: '500',
	},
});

export default OnboardingDone;

import {
	Dimensions,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { OnboardingValue } from '../store';
import { FormState } from '../store';

import messageImage from './../../../../assets/onboarding-start.png';

const dimension = Dimensions.get('window');
const OnboardingDone = () => {
	const navigation = useNavigation();

	const submitForm = (value: OnboardingValue) => {
		console.log(value);
	};

	const onPressStart = () => {
		const formValue = FormState.getRawState();
		submitForm(formValue);
		navigation.navigate('OnboardingStep6' as never);
	};

	const onPressLater = () => {
		//TODO: call api for upload onboarding form here
		const formValue = FormState.getRawState();
		submitForm(formValue);
		navigation.reset({
			index: 0,
			routes: [{ name: 'Home' as never }],
		});
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
					<Image style={styles.contentImage} source={messageImage} />
					<Text style={styles.contentText}>
						Ready to spice things up even more?
					</Text>
					<Text style={styles.contentText}>
						How about taking a short test to jazz up your learning
						journey?
					</Text>
				</View>
			</View>
			<View style={styles.footer}>
				<Pressable style={styles.button} onPress={onPressStart}>
					<Text style={styles.buttonText}>Let&apos; Spice it Up</Text>
				</Pressable>
				<Pressable style={styles.button} onPress={onPressLater}>
					<Text style={styles.buttonText}>Maybe Later</Text>
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
		width: dimension.width * 0.8,
		resizeMode: 'cover',
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
		width: dimension.width * 0.8,
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

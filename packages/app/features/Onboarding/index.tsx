// import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// import Background from '../../../assets/onboarding-start.png';

// import { Button } from './components';
// const dimension = Dimensions.get('window');
// export const OnboardingFlow = [
// 	'Onboarding',
// 	'OnboardingStep1',
// 	'OnboardingStep2',
// 	'OnboardinStep3',
// 	'OnboardingStep4',
// ];

// const OnboardingScreen = () => {
// 	const navigation = useNavigation();
// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.contentContainer}>
// 				<Text style={styles.title}>Welcome to Peakee</Text>
// 				<Text style={styles.titleDescription}>
// 					Let&apos;s get you set up
// 				</Text>
// 				<Text style={styles.titleContent}>
// 					Your info helps us make learning fun and find stuff
// 					you&apos;ll love. Let&apos;s dive in and get you learning
// 					with a twist!
// 				</Text>
// 				<Image source={Background} style={styles.image} />
// 			</View>
// 			<Text style={styles.footerDescription}>
// 				Tap the &apos;Start&apos; to set up your information and
// 				we&apos;take it from there.
// 			</Text>
// 			<Button
// 				height={60}
// 				width={dimension.width * 0.8}
// 				onPress={() => navigation.navigate('OnboardingStep1' as never)}
// 			/>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		backgroundColor: '#FF9F00',
// 		flex: 1,
// 		height: 'auto',
// 		zIndex: 100,
// 		paddingHorizontal: 60,
// 		paddingVertical: 10,
// 		justifyContent: 'space-between',
// 		position: 'relative',
// 		gap: 40,
// 	},
// 	contentContainer: {
// 		flex: 1,
// 		width: 'auto',
// 		gap: 20,
// 	},
// 	title: {
// 		color: '#ffffff',
// 		fontSize: 33,
// 		textAlign: 'center',
// 		fontWeight: '700',
// 	},
// 	image: {
// 		alignSelf: 'center',
// 	},
// 	titleDescription: {
// 		color: '#ffffff',
// 		fontSize: 20,
// 		textAlign: 'center',
// 		fontWeight: '600',
// 	},
// 	titleContent: {
// 		color: '#ffffff',
// 		textAlign: 'center',
// 		fontSize: 14,
// 	},
// 	footerDescription: {
// 		color: '#ffffff',
// 		textAlign: 'center',
// 		fontSize: 14,
// 	},
// });

// export default OnboardingScreen;
// export { default as OnboardingStep2 } from './age';
// export { default as OnboardingDone } from './done';
// export { default as OnboardingStep6 } from './exercise';
// export { default as OnboardingStep6a } from './exercise/test';
// export { default as OnboardingStep3 } from './language';
// export { default as OnboardingStep4 } from './language/learning';
// export { default as OnboardingStep5 } from './major';
// export { default as OnboardingStep1 } from './name';

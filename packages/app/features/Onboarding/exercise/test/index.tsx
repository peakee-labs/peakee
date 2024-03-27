// import { useState } from 'react';
// import {
// 	Dimensions,
// 	Image,
// 	Pressable,
// 	StyleSheet,
// 	Text,
// 	View,
// } from 'react-native';

// import testIcon from './../../../../../assets/test-icon.png';
// import testIconActive from './../../../../../assets/test-icon-active.png';
// const dimension = Dimensions.get('window');

// const mockLevels: Array<{ level: string; label: string; desciption: string }> =
// 	[
// 		{
// 			level: 'beginner',
// 			label: 'New to English?',
// 			desciption: 'Start here with the basics',
// 		},
// 		{
// 			level: 'intermediate',
// 			label: 'Already know some English?',
// 			desciption: 'Try this placement test',
// 		},
// 		{
// 			level: 'advanced',
// 			label: 'Mastered English?',
// 			desciption: 'Test your advance proficiency here',
// 		},
// 	];
// const OnboardingExerciseTest = () => {
// 	const [current, setCurrent] = useState<number | undefined>(undefined);
// 	const handlePressTest = () => {
// 		if (current != undefined) {
// 			const currentText = mockLevels[current].level;
// 			console.log('take test at', currentText);
// 		}
// 	};
// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.title}>Find your starting point</Text>
// 			<Text style={styles.titleDescription}>
// 				Select your English skill level and we&apos;ll take it from
// 				there
// 			</Text>
// 			<View style={styles.levelList}>
// 				{mockLevels.map((l, idx) => (
// 					<Pressable
// 						onPress={() => setCurrent(idx)}
// 						key={idx}
// 						style={[
// 							styles.levelBarBase,
// 							idx == current ? styles.levelBarActive : {},
// 						]}
// 					>
// 						<Image
// 							source={idx == current ? testIconActive : testIcon}
// 						/>
// 						<View style={styles.buttonContentContainer}>
// 							<Text
// 								style={[
// 									styles.label,
// 									idx == current
// 										? styles.levelBarTextActive
// 										: styles.levelBarTextInactive,
// 								]}
// 							>
// 								{l.label}
// 							</Text>
// 							<Text
// 								style={[
// 									styles.description,
// 									idx == current
// 										? styles.levelBarTextActive
// 										: styles.levelBarTextInactive,
// 								]}
// 							>
// 								{l.desciption}
// 							</Text>
// 						</View>
// 					</Pressable>
// 				))}
// 			</View>
// 			<Pressable style={styles.footerButton} onPress={handlePressTest}>
// 				<Text style={styles.buttonText}>Next</Text>
// 			</Pressable>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		paddingHorizontal: 50,
// 		paddingTop: 60,
// 		paddingBottom: 20,
// 		backgroundColor: '#FF9F00',
// 	},
// 	title: {
// 		color: '#ffffff',
// 		fontSize: 30,
// 		fontWeight: '700',
// 		alignSelf: 'center',
// 		textAlign: 'center',
// 		marginBottom: 20,
// 	},
// 	titleDescription: {
// 		color: '#ffffff',
// 		fontSize: 16,
// 		alignSelf: 'center',
// 		textAlign: 'center',
// 		marginBottom: 20,
// 	},
// 	levelList: {
// 		gap: 20,
// 		flex: 1,
// 	},
// 	levelBarBase: {
// 		width: dimension.width * 0.8,
// 		alignSelf: 'center',
// 		height: 60,
// 		borderRadius: 100,
// 		paddingHorizontal: 20,
// 		gap: 20,
// 		borderWidth: 1,
// 		borderColor: '#ffffff',
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 	},
// 	levelBarActive: {
// 		backgroundColor: '#ffffff',
// 	},
// 	levelBarTextInactive: {
// 		color: '#ffffff',
// 	},
// 	levelBarTextActive: {
// 		color: '#FFBB4A',
// 	},
// 	buttonContentContainer: {
// 		flexDirection: 'column',
// 	},
// 	label: {
// 		fontWeight: '500',
// 	},
// 	description: {
// 		fontWeight: '400',
// 		fontSize: 13,
// 	},
// 	footerButton: {
// 		width: dimension.width * 0.8,
// 		backgroundColor: '#ffffff',
// 		height: 50,
// 		borderRadius: 100,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	buttonText: {
// 		color: '#FF9F00',
// 		fontWeight: '500',
// 		fontSize: 15,
// 	},
// });
// export default OnboardingExerciseTest;
